import { EthWallet } from '@okxweb3/coin-ethereum';

// 手动定义签名参数的接口
interface SignMessageParams {
    privateKey: string;
    data: string;
}

// 定义创建账户所需的类型
interface AddressInfo {
    chainIndex: string;
    address: string;
    publicKey: string;
    signature: string;
}

interface CreateAccountBody {
    addresses: AddressInfo[];
    signMessage: string;
}

interface CreateAccountResponse {
    code: string;
    msg: string;
    data: {
        accountId: string;
        [key: string]: any;
    };
}

// 生成 UNIX 时间戳的消息签名
export async function createAccount(privateKey: string, address: string, publicKey: string): Promise<CreateAccountResponse> {
    const wallet = new EthWallet();
    const timestamp = Date.now().toString();

    const signParams: SignMessageParams = {
        privateKey: privateKey,
        data: timestamp
    };

    const signature = await wallet.signMessage(signParams);

    const addresses: AddressInfo[] = [{
        chainIndex: '1', // 根据实际链索引设置
        address: address,
        publicKey: publicKey,
        signature: signature
    }];

    const createAccountBody: CreateAccountBody = {
        addresses: addresses,
        signMessage: timestamp
    };

    const response = await fetch('/api/v5/waas/account/create-account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'OKX-API-KEY': process.env.OKX_API_KEY!,
            'OKX-API-SIGN': '', // 计算签名并填入
            'OKX-API-TIMESTAMP': timestamp,
            'OKX-API-PASSPHRASE': process.env.OKX_PASSPHRASE!,
        },
        body: JSON.stringify(createAccountBody),
    });

    const data: CreateAccountResponse = await response.json();
    return data; 
}
