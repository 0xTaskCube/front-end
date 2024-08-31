export const integrationCategories = [
  "general",
  "protocols",
  "services",
] as const

interface TurboIntegration {
  name: string
  href: string
  url: string
  description: string
  imgLight: string
  imgDark: string
  category: (typeof integrationCategories)[number]
}

export const turboIntegrations = {
  // siwe: {
  //   name: "SIWE",
  //   href: "/integration/sign-in-with-ethereum",
  //   url: "https://login.xyz/",
  //   description:
  //     "Sign-In with Ethereum is Web3 authentication using an Ethereum account.",
  //   imgLight: "/integrations/siwe.svg",
  //   imgDark: "/integrations/siwe.svg",
  //   category: "general",
  // },
  // erc20: {
  //   name: "ERC20",
  //   href: "/integration/erc20",
  //   url: "https://eips.ethereum.org/EIPS/eip-20",
  //   description: "ERC20 is a standard for fungible tokens on EVM chains",
  //   imgLight: "/integrations/erc20.png",
  //   imgDark: "/integrations/erc20.png",
  //   category: "protocols",
  // },
  // erc721: {
  //   name: "ERC721",
  //   href: "/integration/erc721",
  //   url: "https://eips.ethereum.org/EIPS/eip-721",
  //   description: "ERC721 is a standard for non-fungible tokens on EVM chains",
  //   imgLight: "/integrations/erc721-icon.png",
  //   imgDark: "/integrations/erc721-icon.png",
  //   category: "protocols",
  // },
  // erc1155: {
  //   name: "ERC1155",
  //   href: "/integration/erc1155",
  //   url: "https://eips.ethereum.org/EIPS/eip-1155",
  //   description: "ERC1155 is a multi-token standard on EVM chains",
  //   imgLight: "/integrations/erc1155-icon.png",
  //   imgDark: "/integrations/erc1155-icon.png",
  //   category: "protocols",
  // },
  etherscan: {
    name: "Etherscan",
    href: "https://etherscan.io",
    url: "https://etherscan.io",
    description:
      "Etherscan is the leading block explorer and search, API & analytics platform for Ethereum.",
    imgLight: "/integrations/etherscan-light.svg",
    imgDark: "/integrations/etherscan-dark.svg",
    category: "general",
  },
  // disco: {
  //   name: "Disco",
  //   href: "/integration/disco",
  //   url: "https://disco.xyz",
  //   description:
  //     "Disco is identity simplified. Giving the tools to consent to how information is shared and with whom.",
  //   imgLight: "/integrations/discoLight.png",
  //   imgDark: "/integrations/discoDark.png",
  //   category: "services",
  // },
  // sessionKeys: {
  //   name: "Session Keys",
  //   href: "/integration/session-keys",
  //   url: "https://viem.sh/",
  //   description:
  //     "Short-lived private keys enable transaction signing and the granting of temporary smart contract permissions.",
  //   imgLight: "/integrations/session-keys.png",
  //   imgDark: "/integrations/session-keys.png",
  //   category: "general",
  // },
  // litProtocol: {
  //   name: "Lit Protocol",
  //   href: "/integration/lit-protocol",
  //   url: "https://litprotocol.com/",
  //   description:
  //     "Lit is distributed key management for encryption, signing, and compute.",
  //   imgLight: "/integrations/lit-protocol.png",
  //   imgDark: "/integrations/lit-protocol.png",
  //   category: "services",
  // },
  openai: {
    name: "OpenAI",
    href: "https://www.openai.com/",
    url: "https://www.openai.com/",
    description:
      "OpenAI offers AI models designed for advanced natural language processing.",
    imgLight: "/integrations/openai-light.svg",
    imgDark: "/integrations/openai-dark.svg",
    category: "general",
  },
  // livepeer: {
  //   name: "Livepeer",
  //   href: "/integration/livepeer",
  //   url: "https://docs.livepeer.org/",
  //   description: "Livepeer is the world's open video infrastructure.",
  //   imgLight: "/integrations/livepeer.svg",
  //   imgDark: "/integrations/livepeer.svg",
  //   category: "protocols",
  // },
  connext: {
    name: "Connext",
    href: "#",
    url: "https://docs.connext.network/",
    description:
      "Connext is a modular protocol for securely passing funds and data between chains.",
    imgLight: "/integrations/connext.png",
    imgDark: "/integrations/connext.png",
    category: "protocols",
  },
  
  gitcoinPassport: {
    name: "Gitcoin Passport",
    href: "#",
    url: "https://docs.passport.gitcoin.co/overview/introducing-gitcoin-passport",
    description:
      "Gitcoin Passport is an identity verification application. It enables you to collect verifiable credentials that prove your identity and trustworthiness without exposing personally identifying information.",
    imgLight: "/integrations/gitcoin-passport.svg",
    imgDark: "/integrations/gitcoin-passport.svg",
    category: "services",
  },
  defiLlama: {
    name: "DefiLlama",
    href: "#",
    url: "https://defillama.com/docs/api",
    description: "Open and transparent DeFi analytics. ",
    imgLight: "/integrations/defi-llama.png",
    category: "services",
    imgDark: "/integrations/defi-llama.png",
  },
  // starter: {
  //   name: "Starter Template",
  //   href: "/integration/starter",
  //   url: "https://docs.turboeth.xyz/overview",
  //   description:
  //     "Use this template to get started building integrations with TurboETH.",
  //   imgLight: "/logo-gradient.png",
  //   category: "general",
  //   imgDark: "/logo-gradient.png",
  // },
} as const
