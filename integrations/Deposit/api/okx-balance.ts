import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import https from 'https';

export const GET = (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = process.env.OKX_API_KEY;
  const secretKey = process.env.OKX_SECRET_KEY;
  const passphrase = process.env.OKX_PASSPHRASE;

  // 当前的时间戳
  const timestamp = new Date().toISOString();

  // 生成签名
  const signature = generateSignature(timestamp, 'GET', '/api/v5/account/balance');

  // 配置请求选项
  const options = {
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

  // 发送 HTTPS 请求
  const request = https.request(options, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      res.status(200).json(JSON.parse(data));
    });
  });

  // 处理请求错误
  request.on('error', (error) => {
    console.error(`Request error: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  // 结束请求
  request.end();
};

// 签名生成函数
function generateSignature(timestamp: string, method: string, requestPath: string, body: string = '') {
  const prehashString = `${timestamp}${method}${requestPath}${body}`;
  const hmac = crypto.createHmac('sha256', process.env.OKX_SECRET_KEY as string);
  hmac.update(prehashString);
  return hmac.digest('base64');
}
