import { bip39 } from "@okxweb3/crypto-lib";
import { EthWallet } from "@okxweb3/coin-ethereum";
import { TrxWallet } from "@okxweb3/coin-tron";

export async function createEthWallet() {
  const wallet = new EthWallet();
  const mnemonic = bip39.generateMnemonic();
  const hdPath = await wallet.getDerivedPath({ index: 0 });
  const derivePrivateKey = await wallet.getDerivedPrivateKey({ mnemonic: mnemonic, hdPath: hdPath });
  const newAddress = await wallet.getNewAddress({ privateKey: derivePrivateKey });

  return {
    mnemonic,
    address: newAddress.address,
    publicKey: newAddress.publicKey,
  };
}

export async function createTronWallet() {
  const wallet = new TrxWallet();
  const mnemonic = bip39.generateMnemonic();
  const hdPath = await wallet.getDerivedPath({ index: 0 });
  const derivePrivateKey = await wallet.getDerivedPrivateKey({ mnemonic: mnemonic, hdPath: hdPath });

  const newAddress = await wallet.getNewAddress({ privateKey: derivePrivateKey });

  return {
    mnemonic,
    address: newAddress.address,
  };
}
