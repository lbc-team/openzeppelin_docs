# Contracts

**A library for secure smart contract development.** Build on a solid foundation of community-vetted code.

- Implementations of standards like [ERC20](https://docs.openzeppelin.com/contracts/2.x/erc20) and [ERC721](https://docs.openzeppelin.com/contracts/2.x/erc721).
- Flexible [role-based permissioning](https://docs.openzeppelin.com/contracts/2.x/access-control) scheme.
- Reusable [Solidity components](https://docs.openzeppelin.com/contracts/2.x/utilities) to build custom contracts and complex decentralized systems.
- First-class integration with the [Gas Station Network](https://docs.openzeppelin.com/contracts/2.x/gsn) for systems with no gas fees!
- Audited by leading security firms.

## Overview

### Installation

```console
$ npm install @openzeppelin/contracts
```

OpenZeppelin Contracts features a [stable API](https://docs.openzeppelin.com/contracts/2.x/releases-stability#api-stability), which means your contracts won’t break unexpectedly when upgrading to a newer minor version.

### Usage

Once installed, you can use the contracts in the library by importing them:

```solidity
pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";

contract MyNFT is ERC721Full, ERC721Mintable {
    constructor() ERC721Full("MyNFT", "MNFT") public {
    }
}
```

|      | If you’re new to smart contract development, head to [Developing Smart Contracts](https://docs.openzeppelin.com/learn/developing-smart-contracts) to learn about creating a new project and compiling your contracts. |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

To keep your system secure, you should **always** use the installed code as-is, and neither copy-paste it from online sources, nor modify it yourself. The library is designed so that only the contracts and functions you use are deployed, so you don’t need to worry about it needlessly increasing gas costs.

## Learn More

The guides in the sidebar will teach about different concepts, and how to use the related contracts that OpenZeppelin Contracts provides:

- [Access Control](https://docs.openzeppelin.com/contracts/2.x/access-control): decide who can perform each of the actions on your system.
- [Tokens](https://docs.openzeppelin.com/contracts/2.x/tokens): create tradeable assets or collectives, and distribute them via [Crowdsales](https://docs.openzeppelin.com/contracts/2.x/crowdsales).
- [Gas Station Network](https://docs.openzeppelin.com/contracts/2.x/gsn): let your users interact with your contracts without having to pay for gas themselves.
- [Utilities](https://docs.openzeppelin.com/contracts/2.x/utilities): generic useful tools, including non-overflowing math, signature verification, and trustless paying systems.

The [full API](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20) is also thoroughly documented, and serves as a great reference when developing your smart contract application. You can also ask for help or follow Contracts’s development in the [community forum](https://forum.openzeppelin.com/).

Finally, you may want to take a look at the [guides on our blog](https://blog.openzeppelin.com/guides/), which cover several common use cases and good practices.. The following articles provide great background reading, though please note, some of the referenced tools have changed as the tooling in the ecosystem continues to rapidly evolve.

- [The Hitchhiker’s Guide to Smart Contracts in Ethereum](https://blog.openzeppelin.com/the-hitchhikers-guide-to-smart-contracts-in-ethereum-848f08001f05) will help you get an overview of the various tools available for smart contract development, and help you set up your environment.
- [A Gentle Introduction to Ethereum Programming, Part 1](https://blog.openzeppelin.com/a-gentle-introduction-to-ethereum-programming-part-1-783cc7796094) provides very useful information on an introductory level, including many basic concepts from the Ethereum platform.
- For a more in-depth dive, you may read the guide [Designing the architecture for your Ethereum application](https://blog.openzeppelin.com/designing-the-architecture-for-your-ethereum-application-9cec086f8317), which discusses how to better structure your application and its relationship to the real world.