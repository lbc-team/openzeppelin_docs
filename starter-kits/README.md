# Starter Kits

**The easiest way to get started building an Ethereum powered (d)app**. Bundled with all the tools necessary to get started, you can be up and running with a working smart contract powered (d)app in less than 5 minutes!

- **Upgrade smart contracts**. Fix bugs and security vulnerabilities, and introduce new features to your projects without migrating all your data.
- **Reuse on-chain code**. Reuse on-chain Solidity code that has been vetted by the community. Link to on-chain smart contract packages (Ethereum Packages) as building blocks for your project, and publish your packages for others to use. OpenZeppelin is included in the example.
- **Easily connect with Ethereum networks via preconfigured Infura API keys**. Use Infura to connect and access data from different test-nets and mainnet of Ethereum. They provide an easy-to-use API and developer tools to enable secure, reliable, and scalable access to Ethereum and IPFS (InterPlanetary File System).
- **Compile and test smart contracts**. The Starter Kit includes the Truffle suite with a development environment, a testing framework, and an asset pipeline for blockchains using the Ethereum Virtual Machine (EVM).
- **Create adaptable and responsive UI components**. The Starter Kit includes React and Rimble to give you all the components and flexibility you need to build responsive user interfaces.
- **Use standard Ethereum development tools and processes for minimal development overhead**. If you have been developing on Ethereum for years or are a complete newbie, you will feel at home developing with Starter Kits.

Starter Kits include ecosystem standard tools such as the OpenZeppelin Contracts library, OpenZeppelin SDK, Truffle, Ganache, and Infura. A React front end turbocharged with Hot Reloader comes pre-wired to give you a fast development experience right out of the box.

OpenZeppelin Starter Kit also comes with an optional built-in tutorial, making it a perfect educational tool for getting started with smart contract and (d)app development.

## Why use Starter Kits?

When interviewing developers building on OpenZeppelin tools, we found there was a strong need in the community for a robust solution to the boiler plate code that goes into building smart-contract backed applications. As standards and technology change so quickly in the blockchain ecosystem, it was clear that what was needed was a robust, well-documented, up-to-date scaffold that developers could quickly build upon at all levels. From weekend hackathons to enterprise applications, OpenZeppelin Starter Kits is that tool.

## Overview

## Installation

Starter kits are unpacked using the [OpenZeppelin CLI](https://docs.openzeppelin.com/starter-kits/#sdk::index.adoc):

```console
$ npm install --global @openzeppelin/cli
$ npx oz unpack starter
```

## How They Work

Each Starter Kit creates a React application that serves as a web user interface. This interface allows you to interact with your smart contracts via a web3 provider: Metamask, Coinbase Wallet, and others. The interaction is enabled by Truffle and the OpenZeppelin SDK. They work together so you can compile and test your smart contracts locally as well as on-chain. Eventually, when you are ready to deploy your application to mainnet, Infura is already configured to help you do so effortlessly.

## Learn More

- Take a look at [all available Starter Kits](https://docs.openzeppelin.com/starter-kits/list).
- See all of our tools for [Building a Dapp](https://docs.openzeppelin.com/starter-kits/#learn::on-daps.adoc.adoc).
- Or check out [how to create your own kit!](https://docs.openzeppelin.com/starter-kits/create)