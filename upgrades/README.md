# Upgrades

**Deploy and upgrade smart contracts securely** from your JavaScript code.

This library powers the [**OpenZeppelin CLI**](https://docs.openzeppelin.com/cli/2.7/), by implementing all its deployment and upgrade operations. You can call into this library directly from your scripts if you do not want to go through the CLI.

|      | The upgrades library only creates and upgrades contracts. It will not keep the [CLI configuration](https://docs.openzeppelin.com/cli/2.7/configuration) files up to date with new deployments, meaning that you will have to track your contract addresses on your own. We will be working on a new version of this library that can handle this in the future. |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

## Overview

### Installation

```console
$ npm install @openzeppelin/upgrades
```

### Usage

This sample script deploys `MyContract` (which should be already compiled) to a blockchain network running locally at port 9545:

```javascript
const { ZWeb3, Contracts, SimpleProject } = require('@openzeppelin/upgrades');

async function main() {
  // Initialize a web3 provider
  ZWeb3.initialize("http://localhost:9545");

  // Load the contract
  const MyContract = Contracts.getFromLocal('MyContract');

  // Instantiate a project
  const myProject = new SimpleProject('MyProject', {
    from: await ZWeb3.defaultAccount()
  });

  // Create a proxy for the contract
  const proxy = await myProject.createProxy(MyContract);

  // Make a change on the contract, and compile it
  const MyContractUpgraded = Contracts.getFromLocal('MyContractUpgraded');
  myProject.upgradeProxy(proxy, MyContractUpgraded);
}

main();
```

## Learn More

- Check out [Writing Upgradeable Contracts](https://docs.openzeppelin.com/upgrades/2.7/writing-upgradeable) to learn about secure patterns when dealing with upgrades, and pitfalls to avoid.
- [Creating Upgradeable Contracts From Solidity](https://docs.openzeppelin.com/upgrades/2.7/writing-upgradeable) will teach you about contract factories that allow for upgrades.
- To know how upgrades work under the hood, [Proxies](https://docs.openzeppelin.com/upgrades/2.7/proxies) will provide you with all the low-level detail you crave.
- Take a look at the [API Reference](https://docs.openzeppelin.com/upgrades/2.7/api) for all smart contracts involved in an Upgrades project.