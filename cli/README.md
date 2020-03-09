# Command Line Interface (CLI)

**Develop, deploy and operate upgradeable smart contract projects**. Support for Ethereum and every other EVM-powered blockchain.

- **Interactive commands**: Send transactions, query balances, and interact with your contracts directly from the command line, using commands like `oz send-tx`, `oz call`, `oz balance`, and `oz transfer`.
- **Deploy & upgrade your contracts**: You can develop your smart contracts iteratively, speeding up development locally, or squashing bugs in production. Run `oz create` to deploy your contracts, followed by `oz upgrade` any time you want to change their code.
- **Link Ethereum Packages**: Use code from contracts already deployed to the blockchain directly on your project, saving gas on deployments and managing your dependencies securely, just with an `oz link` command.
- **Bootstrap your dapp**: Jumpstart your dapp by unpacking one of our starter kits, pre-configured with OpenZeppelin Contracts, React, and Infura. Run `oz unpack` to start!

## Overview

### Installation

```console
$ npm install @openzeppelin/cli
```

### Usage

All CLI commands are fully interactive: you can call them with no or incomplete arguments and they will prompt you for options as they proceed.

Below is a short list of the most used commands:

- [`oz init`](https://docs.openzeppelin.com/cli/2.7/commands#init): initialize your OpenZeppelin project
- [`oz compile`](https://docs.openzeppelin.com/cli/2.7/commands#compile): compile all Solidity smart contracts in your project
- [`oz create`](https://docs.openzeppelin.com/cli/2.7/commands#create): deploy an upgradeable smart contract
- [`oz send-tx`](https://docs.openzeppelin.com/cli/2.7/commands#send): send a transaction to a contract and execute a function
- [`oz call`](https://docs.openzeppelin.com/cli/2.7/commands#call): read data from the blockchain by calling `view` and `pure` functions
- [`oz upgrade`](https://docs.openzeppelin.com/cli/2.7/commands#upgrade): upgrade a deployed contract to a new version without changing the address or state
- [`oz unpack`](https://docs.openzeppelin.com/cli/2.7/commands#unpack): bootstrap a project with a [Starter Kit](https://docs.openzeppelin.com/starter-kits/)
- [`oz link`](https://docs.openzeppelin.com/cli/2.7/commands#link): reuse on-chain code by to a [linking to Ethereum Packages](https://docs.openzeppelin.com/cli/2.7/dependencies)

## Learn More

- Head to [Getting Started](https://docs.openzeppelin.com/cli/2.7/getting-started) to see the CLI in action by deploying and upgrading a smart contract!
- [Using Dependencies](https://docs.openzeppelin.com/cli/2.7/#using-dependencies.adoc) showcases a more complex project being built, including leveraging the [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/2.x/) library.
- If you are a Truffle user, go to [Using With Truffle](https://docs.openzeppelin.com/cli/2.7/truffle) for information on using both tools on the same project.
- Take a look at the API reference for all [CLI commands](https://docs.openzeppelin.com/cli/2.7/commands).
- For an overview of the internals of the CLI, you can read on the [Contracts Architecture](https://docs.openzeppelin.com/cli/2.7/contracts-architecture) and different [Configuration Files](https://docs.openzeppelin.com/cli/2.7/configuration).

|      | Looking for the documentation for version 2.4 or earlier? You can find it [here](https://docs.zeppelinos.org/versions). |
| ---- | ------------------------------------------------------------ |
|      |                                                              |