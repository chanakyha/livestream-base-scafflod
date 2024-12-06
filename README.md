
# 🏗️ Scaffold-Base 🔵

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

Scaffold-Base is a fork of Scaffold-ETH-2 ready to ship to Base. This fork provides native support for Base and Base Sepolia testnet, direct access to the Base faucets, and [coinbase-sdk-wallet](https://github.com/coinbase/coinbase-wallet-sdk/) beta preconfigured which allows 4337 account abstraction using passkeys.

![Scaffold-Base)](https://github.com/damianmarti/se-2/assets/466652/eac667a7-68fb-4f69-a427-126f7de4114d)

We highly recommend the Scaffold-ETH-2 docs as the primary guideline.

# (forked from 🏗 Scaffold-ETH-2)

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/damianmarti/se-2/assets/466652/672d178c-38c9-4c9a-953d-d36acf08f3cd)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-Base, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/BuidlGuidl/scaffold-base
cd scaffold-base
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

**What's next**:

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/hardhat/deploy`
- Edit your smart contract test in: `packages/hardhat/test`. To run test use `yarn hardhat:test`


Redeploy your contracts:

```
yarn deploy --reset
```


# 🔵 Deploy to Base


When you are ready to deploy to Base, generate a deployer account: 

```
yarn generate
```



Fund the deployer account with ETH on Base at:

```
yarn account
```


Deploy to Base:

```
yarn deploy --network base 
```


Set your target network to Base:

> Change "chains.hardhat" to "chains.base" in targetNetworks from `scaffold.config.ts` in `packages/nextjs`


Deploy your app to Vercel:

```
yarn vercel:yolo --prod
```

# 🍽️ Fork Mainnet Base

> stop your `yarn chain`

```

yarn fork

```

(now your local hardhat chain is a fork of Base and you can talk to forked Base contracts)

# <img src="https://github.com/damianmarti/se-2/assets/466652/a795d1f3-980b-4e53-9784-ac53b6dd980e" width="35"> Coinbase Smart Wallet

Coinbase Smart Wallet will be shown automatically when [scaffold.config.ts](https://github.com/BuidlGuidl/scaffold-base/blob/main/packages/nextjs/scaffold.config.ts) `targetNetworks` contains the network ***baseSepolia***.

Since [coinbase beta sdk connector](https://github.com/coinbase/coinbase-wallet-sdk/blob/master/packages/wallet-sdk/docs/v4_with_wagmi.md) for now only works with Base Sepolia.

For interacting with contracts, you can nicely use [scaffold-eth custom hooks](https://docs.scaffoldeth.io/hooks/) (wrappers around wagmi) or wagmi hooks directly without needing to change anything. 

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
