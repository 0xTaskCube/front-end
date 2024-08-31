import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import https from 'https';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method || 'GET';

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const apiKey = process.env.OKX_API_KEY;
  const secretKey = process.env.OKX_SECRET_KEY;
  const passphrase = process.env.OKX_PASSPHRASE;

  if (!apiKey || !secretKey || !passphrase) {
    res.status(500).json({ error: 'Missing OKX API credentials' });
    return;
  }

  const timestamp = new Date().toISOString();
  const signature = generateSignature(timestamp, method, '/api/v5/account/balance', secretKey);

  const options: https.RequestOptions = {
    hostname: 'www.okx.com',
    path: `/api/v5/account/balance?ccy=BTC`,
    method: 'GET',
    headers: {
      'OK-ACCESS-KEY': apiKey,
      'OK-ACCESS-SIGN': signature,
      'OK-ACCESS-TIMESTAMP': timestamp,
      'OK-ACCESS-PASSPHRASE': passphrase,
    },
  };

  try {
    const data = await makeRequest(options);
    res.status(200).json(JSON.parse(data));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Request error: ${errorMessage}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

function generateSignature(timestamp: string, method: string, requestPath: string, secretKey: string, body: string = ''): string {
  const prehashString = `${timestamp}${method}${requestPath}${body}`;
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(prehashString);
  return hmac.digest('base64');
}

function makeRequest(options: https.RequestOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    const request = https.request(options, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        resolve(data);
      });
    });

    request.on('error', (error) => {
      reject(error);
    });

    request.end();
  });
}
