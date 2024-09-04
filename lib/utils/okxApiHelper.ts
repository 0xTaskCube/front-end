import https from 'https';
import crypto from 'crypto';
import querystring from 'querystring';

const apiConfig = {
  apiKey: process.env.OKX_API_KEY || '',
  secretKey: process.env.OKX_SECRET_KEY || '',
  passphrase: process.env.OKX_PASSPHRASE || '',
  project: process.env.OKX_PROJECT_ID || '' 
};

function preHash(timestamp: string, method: string, requestPath: string, params?: Record<string, any>): string {
  let queryString = '';
  if (method === 'GET' && params) {
    queryString = '?' + querystring.stringify(params);
  }
  if (method === 'POST' && params) {
    queryString = JSON.stringify(params);
  }
  return timestamp + method + requestPath + queryString;
}

function sign(message: string, secretKey: string): string {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(message);
  return hmac.digest('base64');
}

function createSignature(method: string, requestPath: string, params?: Record<string, any>) {
  const timestamp = new Date().toISOString().slice(0, -1); 
  const message = preHash(timestamp, method, requestPath, params);
  const signature = sign(message, apiConfig.secretKey);
  return { signature, timestamp };
}

export async function sendGetRequest(requestPath: string, params?: Record<string, any>) {
  const { signature, timestamp } = createSignature('GET', requestPath, params);

  const headers = {
    'OK-ACCESS-KEY': apiConfig.apiKey,
    'OK-ACCESS-SIGN': signature,
    'OK-ACCESS-TIMESTAMP': timestamp,
    'OK-ACCESS-PASSPHRASE': apiConfig.passphrase,
    'OK-ACCESS-PROJECT': apiConfig.project 
  };

  const options = {
    hostname: 'www.okx.com',
    path: requestPath + (params ? `?${querystring.stringify(params)}` : ''),
    method: 'GET',
    headers: headers
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });
}

export async function sendPostRequest(requestPath: string, params?: Record<string, any>) {
  const { signature, timestamp } = createSignature('POST', requestPath, params);

  const headers = {
    'OK-ACCESS-KEY': apiConfig.apiKey,
    'OK-ACCESS-SIGN': signature,
    'OK-ACCESS-TIMESTAMP': timestamp,
    'OK-ACCESS-PASSPHRASE': apiConfig.passphrase,
    'OK-ACCESS-PROJECT': apiConfig.project,
    'Content-Type': 'application/json'
  };

  const options = {
    hostname: 'www.okx.com',
    path: requestPath,
    method: 'POST',
    headers: headers
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (params) {
      req.write(JSON.stringify(params));
    }

    req.end();
  });
}
