# Contracts Architecture

Features such as contract upgrades and Ethereum Package linking involve interacting with a number of smart contracts. While regular usage of the CLI does not require awareness of these low-level details, it is still helpful to understand how everything works under the hood.

The following sections describe the contract achitecture behind both upgrades and Ethereum Packages.

>  Most of these contracts are actually part of [**OpenZeppelin Upgrades**](https://docs.openzeppelin.com/upgrades/2.7/), which the CLI uses.


## Upgrades

The source code of the contracts involved with upgrades is located [here](https://github.com/OpenZeppelin/openzeppelin-sdk/tree/v2.6.0/packages/lib/contracts/upgradeability).

### `ProxyAdmin`

[`ProxyAdmin`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyAdmin) is a central admin for all [proxies](https://docs.openzeppelin.com/upgrades/2.7/proxies) on your behalf, making their management as simple as possible.

As an admin of all proxy contracts it is in charge of upgrading them, as well as transferring their ownership to another admin. This contract is used to complement the [Transparent Proxy Pattern](https://docs.openzeppelin.com/upgrades/2.7/proxies#transparent-proxies-and-function-clashes), which prevents an admin from accidentally triggering a proxy management function when interacting with their instances. `ProxyAdmin` is owned by its deployer (the project owner), and exposes its administrative interface to this account.

A `ProxyAdmin` is only deployed when you run an `oz create` (or `oz create2`) command for the first time. You can force the CLI to deploy one by running `oz push --deploy-proxy-admin`.

You can read its source code [here](https://github.com/OpenZeppelin/openzeppelin-sdk/blob/v2.6.0/packages/lib/contracts/upgradeability/ProxyAdmin.sol).

#### Ownership Transfer

The [`oz set-admin`](https://docs.openzeppelin.com/cli/2.7/commands#set-admin) CLI command is used to transfer ownership, both of any single contract or of the entire project (by transferring the ownership of the `ProxyAdmin` contract itself).

A contract’s ownership is transferred by providing its address and the new admin’s:

```console
$ npx oz set-admin [MYCONTRACT_ADDRESS] [NEW_ADMIN_ADDRESS]
```

To instead transfer the whole project, just provide the new admin address:

```console
$ npx oz set-admin [NEW_ADMIN_ADDRESS]
```

> `oz set-admin` is an interactive command: you can also run it with no arguments and it will prompt you for data as it proceeds.

#### Contract Upgrades via `ProxyAdmin`

The `ProxyAdmin.sol` also responsible for upgrading our contracts. When you run the `oz upgrade` command, it goes through `ProxyAdmin’s` [`upgrade`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyAdmin-upgrade-contract-AdminUpgradeabilityProxy-address-) method. The `ProxyAdmin` contract also provides another method [`getProxyImplementation`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyAdmin-getProxyImplementation-contract-AdminUpgradeabilityProxy-) which returns the current implementation of a given proxy.

You can find your `ProxyAdmin` contract address in [`.openzeppelin/.json`](https://docs.openzeppelin.com/cli/2.7/configuration#network.json) under the same name.

```json
// .openzeppelin/<network.json>
"proxyAdmin": {
   "address": <proxyAdmin-address>
}
```

### `ProxyFactory`

[`ProxyFactory`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyFactory) is used when creating contracts via the `oz create2` command, as well as when creating minimal proxies. It contains all the necessary methods to deploy a proxy through the `CREATE2` opcode or a minimal non-upgradeable proxy.

This contract is only deployed when you run `openzeppelin create2` or `openzeppelin create --minimal` for the first time. You can force the CLI to deploy it by running `openzeppelin push --deploy-proxy-factory`.

You can read its source code [here](https://github.com/OpenZeppelin/openzeppelin-sdk/blob/v2.6.0/packages/lib/contracts/upgradeability/ProxyFactory.sol).

## Ethereum Packages

The source code of the contracts involved with a published Ethereum Package is located [here](https://github.com/OpenZeppelin/openzeppelin-sdk/tree/v2.6.0/packages/lib/contracts/application).

### `App`

[`App`](https://docs.openzeppelin.com/upgrades/2.7/api#App) is the project’s main entry point. Its most important function is to manage your project’s "providers". A provider is basically an Ethereum Package identified by a name at a specific version. For example, a project may track your application’s contracts in one provider named "my-application" at version "0.0.1", an OpenZeppelin Contracts provider named "@openzeppelin/contracts-ethereum-package" at version "2.0.0", and a few other providers. These providers are your project’s sources of on-chain logic.

The providers are mapped by name to `ProviderInfo` structs:

```solidity
// App.sol
    ...

    mapping(string => ProviderInfo) internal providers;

    struct ProviderInfo {
        Package package;
        uint64[3] version;
    }

    ...
```

When you upgrade one of your application’s smart contracts, it is your application provider named "my-application" that is bumped to a new version, e.g. from "0.0.1" to "0.0.2". On the other hand, when you decide to use a new version of the OpenZeppelin Ethereum Package in your project, it is the "@openzeppelin/contracts-ethereum-package" provider which is now pointed at the "2.0.1" version of the package, instead of "2.0.0".

An Ethereum Package is defined by the `Package` contract, as we’ll see next.

> Additionally the `App` contract also facilitates the creation of proxies, by conveniently wrapping around the `AdminUpgradeabilityProxy` contract.

You can read its source code [here](https://github.com/OpenZeppelin/openzeppelin-sdk/blob/v2.6.0/packages/lib/contracts/application/App.sol).

### `Package`

A [`Package`](https://docs.openzeppelin.com/upgrades/2.7/api#Package) contract tracks all the versions of a given Ethereum Package. Following the example above, one package could be the "application package" associated to the name "my-application" containing all the contracts for version "0.0.1" of your application, and all the contracts for version "0.0.2" as well. Alternatively, another package could be an Ethereum Package associated to the name "@openzeppelin/contracts-ethereum-package" which contains a large number of versions "x.y.z" each of which contains a given set of contracts.

The versions are mapped by a semver hash to `Version` structs:

```solidity
// Package.sol
    ...

    mapping (bytes32 => Version) internal versions;

    struct Version {
        uint64[3] semanticVersion;
        address contractAddress;
        bytes contentURI;
    }

    ...
```

You can read its source code [here](https://github.com/OpenZeppelin/openzeppelin-sdk/blob/v2.6.0/packages/lib/contracts/application/Package.sol).

### `ImplementationDirectory`

A version’s `contractAddress` is an instance of the A [`ImplementationDirectory`](https://docs.openzeppelin.com/upgrades/2.7/api#ImplementationDirectory) contract, which is basically a mapping of contract aliases (or names) to deployed implementation instances. Continuing the example, your project’s "my-application" package for version "0.0.1" could contain a directory with the following contracts:

**Directory for version "0.0.1" of the "my-application" package**

- Alias: "MainContract", Implementation: "0x0B06339ad63A875D4874dB7B7C921012BbFfe943"
- Alias: "MyToken", Implementation: "0x1b9a62585255981c85Acec022cDaC701132884f7"

While version "0.0.2" of the "my-application" package could look like this:

**Directory for version "0.0.2" of the "my-application" package**

- Alias: "MainContract", Implementation: "0x0B06339ad63A875D4874dB7B7C921012BbFfe943"
- Alias: "MyToken", Implementation: "0x724a43099d375e36c07be60c967b8bbbec985dc8" ←-- this changed

Notice how version "0.0.2" uses a new implementation for the "MyToken" contract.

Likewise, different versions of the "@openzeppelin/contracts-ethereum-package" Ethereum Package could contain different implementations for persisting aliases such as "ERC20", "ERC721", etc.

An `ImplementationDirectory` is a contract that adopts the `ImplemetationProvider` interface, which simply requires that for a given contract alias or name, the deployed address of a contract is provided. In this particular implementation of the interface, an `ImplementationDirectory` can be frozen, indicating that it will no longer be able to set or unset additional contracts and aliases. This is helpful for making official releases of Ethereum Packages, where the immutability of the package is guaranteed.

Other implementations of the interface could provide contracts without such a limitation, which makes the architecture pretty flexible, yet secure.

You can read its source code [here](https://github.com/OpenZeppelin/openzeppelin-sdk/blob/v2.6.0/packages/lib/contracts/application/ImplementationDirectory.sol).

### Overview

The following diagram illustrates the interface of the contracts of published Ethereum Packages:

![OpenZeppelin 2.x UML](https://docs.openzeppelin.com/cli/2.7/_images/architecture.png)