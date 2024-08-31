import { bip39, BigNumber } from "@okxweb3/crypto-lib";
import { EthWallet } from "@okxweb3/coin-ethereum";

export async function createEthWallet() {
  // eth wallet
  const wallet = new EthWallet();

  // 生成助记词
  const mnemonic = bip39.generateMnemonic();
  console.log("生成的助记词:", mnemonic);

  // 推导出路径
  const hdPath = await wallet.getDerivedPath({ index: 0 });
  const derivePrivateKey = await wallet.getDerivedPrivateKey({ mnemonic: mnemonic, hdPath: hdPath });
  console.log("生成的派生私钥:", derivePrivateKey, ", 派生路径: ", hdPath);

  // 获取新地址
  const newAddress = await wallet.getNewAddress({ privateKey: derivePrivateKey });
  console.log("生成的新地址:", newAddress.address);

  // 获取公钥
  const publicKey = newAddress.publicKey;
  console.log("对应的公钥:", publicKey);

  return {
    mnemonic,
    address: newAddress.address,
    publicKey,
  };
}
