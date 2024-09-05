import { bip39 } from "@okxweb3/crypto-lib";
import { EthWallet } from "@okxweb3/coin-ethereum";
import { TrxWallet } from "@okxweb3/coin-tron";
import { encrypt } from '@/lib/utils/encryptionHelper';  // 导入加密函数

// 生成以太坊钱包并加密私钥和助记词
export async function createEthWallet() {
  const wallet = new EthWallet();
  const mnemonic = bip39.generateMnemonic();
  const hdPath = await wallet.getDerivedPath({ index: 0 });
  const derivePrivateKey = await wallet.getDerivedPrivateKey({ mnemonic: mnemonic, hdPath: hdPath });
  const newAddress = await wallet.getNewAddress({ privateKey: derivePrivateKey });

  // 加密私钥和助记词
  const encryptedMnemonic = encrypt(mnemonic);
  const encryptedPrivateKey = encrypt(derivePrivateKey);

  return {
    mnemonic: encryptedMnemonic,  // 返回加密后的助记词
    privateKey: encryptedPrivateKey,  // 返回加密后的私钥
    address: newAddress.address,
    publicKey: newAddress.publicKey,
  };
}

// 生成Tron钱包并加密私钥和助记词
export async function createTronWallet() {
  const wallet = new TrxWallet();
  const mnemonic = bip39.generateMnemonic();
  const hdPath = await wallet.getDerivedPath({ index: 0 });
  const derivePrivateKey = await wallet.getDerivedPrivateKey({ mnemonic: mnemonic, hdPath: hdPath });
  const newAddress = await wallet.getNewAddress({ privateKey: derivePrivateKey });

  // 加密私钥和助记词
  const encryptedMnemonic = encrypt(mnemonic);
  const encryptedPrivateKey = encrypt(derivePrivateKey);

  return {
    mnemonic: encryptedMnemonic,  // 返回加密后的助记词
    privateKey: encryptedPrivateKey,  // 返回加密后的私钥
    address: newAddress.address,
  };
}
