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

// 获取签名所需信息
export async function getSignInfo(fromAddr: string, toAddr: string, txAmount: string) {
  const postSignInfoBody = {
    chainIndex: '1',
    fromAddr: fromAddr,
    toAddr: toAddr,
    txAmount: txAmount,
    extJson: { inputData: '0x' }
  };

  const apiRequestUrl = '/api/v5/waas/wallet/pre-transaction/sign-info';
  return sendPostRequest(apiRequestUrl, postSignInfoBody);
}

// 发送交易
export async function sendTransaction(signedTx: string, fromAddr: string, toAddr: string, txHash: string) {
  const postSendTransactionBody = {
    signedTx: signedTx,
    chainId: '1',
    fromAddr: fromAddr,
    toAddr: toAddr,
    txHash: txHash,
    txAmount: '10000000000',
    serviceCharge: '100000000',
    tokenAddress: '0x55d398326f99059ff775485246999027b3197955',
    txType: 'transfer',
    extJson: { gasPrice: '196582914', gasLimit: '21000', nonce: '578' }
  };

  const apiRequestUrl = '/api/v5/waas/wallet/pre-transaction/send-transaction';
  return sendPostRequest(apiRequestUrl, postSendTransactionBody);
}

// 查询交易详情
export async function getTransactionDetail(accountId: string, orderId: string) {
  const params = {
    accountId: accountId,
    orderId: orderId,
    chainIndex: '1'
  };

  const apiRequestUrl = '/api/v5/waas/wallet/post-transaction/transaction-detail-by-ordid';
  return sendGetRequest(apiRequestUrl, params);
}

// 添加代币并查询余额
export async function addToken(accountId: string, tokenAddress: string) {
  const postAddTokenBody = {
    accountId: accountId,
    chainIndex: '1',
    tokenAddress: tokenAddress
  };

  const apiRequestUrl = '/api/v5/waas/wallet/asset/add-token';
  return sendPostRequest(apiRequestUrl, postAddTokenBody);
}

export async function getTokenBalance(accountId: string, tokenAddress: string) {
  const params = {
    accountId: accountId,
    tokenAddresses: [
      {
        chainIndex: '1',
        tokenAddress: tokenAddress
      }
    ]
  };

  const apiRequestUrl = '/api/v5/waas/asset/token-balances';
  return sendGetRequest(apiRequestUrl, params);
}

export async function getDepositHistory(accountId: string) {
  const params = {
    accountId: accountId,
    chainIndex: '1',  // 假设使用 Arbitrum 网络
    // 根据 OKX API 的要求添加其他必要的参数
  };

  const apiRequestUrl = '/api/v5/waas/wallet/deposit-history';  // 请根据实际的 OKX API 端点进行调整
  return sendGetRequest(apiRequestUrl, params);
}

