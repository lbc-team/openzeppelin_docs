# Configuration Files

The OpenZeppelin CLI stores your project’s configuration in the `.openzeppelin` directory, inside a number of JSON files. Those are described here.

|      | You can skip ahead to see which files you should [track using version control](https://docs.openzeppelin.com/cli/2.7/configuration#configuration-files-in-version-control). |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

## `project.json`

This stores the project’s general configuration, and is created by the `oz init` command. It has the following structure:

```json
// .openzeppelin/project.json
{
  "manifestVersion": "2.2",
  "name": <projectName>,
  "version": <version>,
  "publish": <publishFlag>,
  "contracts": {
    <contract-1-alias>: <contract-1-name>,
    <contract-2-alias>: <contract-2-name>,
    ...
    <contract-N-alias>: <contract-N-name>
  },
  "dependencies": {
    <dependency-1-name>: <dependency-1-version>,
    <dependency-2-name>: <dependency-2-version>,
    ...
    <dependency-N-name>: <dependency-N-version>
  }
}
```

Here, `` is the name of the project, and `` is the current semver number. The boolean value `` indicates whether the project should be automatically published to the network upon being pushed, allowing it to be reused as an Ethereum Package by other projects. The field `manifestVersion` indicates the version of the configuration file.

Once you start adding your contracts via `oz add`, they will be recorded under the `"contracts"` field, with the contract aliases as the keys (which default to the contract names), and the contract names as the values. Finally, if you link a dependency with `oz link`, this will be reflected in the `"dependencies"` field, where `` is the name of the linked Ethereum Package, and `` is its semver required version.

## `.json`

The OpenZeppelin CLI will also generate a file for each of the networks you work on (`local`, `ropsten`, `mainnet`, etc). These should be configured in your `networks.js` file, but note that `oz init` already configures a `local` network for `localhost:8545`. These files share the same structure:

```json
// .openzeppelin/<network_name>.json
{
  "manifestVersion": "2.2",
  "version": <app-version>,
  "contracts": {
    <contract-N-name>: {
      "address": <contract-N-address>,
      "constructorCode": <contract-N-constructor>,
      "bodyBytecodeHash": <contract-N-body>,
      "localBytecodeHash": <contract-N-local>,
      "deployedBytecodeHash": <contract-N-deployed>,
      "types": { ... },
      "storage": [ ... ],
      "warnings": { ... }
    },
    ...
  },
  "solidityLibs": {
    ...
  },
  "proxies": {
    <package-name>/<contract-name>: [
      {
        "address": <proxy-1-address>,
        "version": <proxy-1-version>,
        "implementation": <implementation-1-address>
      },
      ...
    ],
    ...
  },
  "proxyAdmin": {
    "address": <proxyAdmin-address>
  },
  "app": {
    "address": <app-address>
  },
  "package": {
    "address": <package-address>
  },
  "provider": {
    "address": <provider-address>
  },
  "dependencies": {
    <dependency-name>: {
      "package": <dependency-address>,
      "version": <dependency-version>,
      "customDeploy": <dependency-custom-deploy>
    },
    ...
  }
}
```

The most important things to see here are the proxies and contracts' addresses, `` and `` respectively. What will happen is that each time you upload new versions of your logic contracts, `` will change. The proxy addresses, however, will stay the same, so you can interact seamlessly with the same addresses as if no change has taken place. Note that `` will always point to the current contract address `` if the proxies are `update`-ed. Proxies are grouped by the name of the package and contract they are backed by.

For every logic contract, besides the deployment address, the following info is also tracked:

- `constructorCode` is the SHA256 hash of the bytecode used to `CREATE` the logic contract
- `bodyBytecodeHash` is the SHA256 hash of the same bytecode as above, stripped of its constructor
- `localBytecodeHash` is the SHA256 hash of the bytecode, including any Solidity library placeholders
- `deployedBytecodeHash` is the SHA256 hash of the bytecode, with all Solidity library placeholders replaced by their corresponding addresses
- `types` keeps track of all the types used in the contract or its ancestors, from basic types like `uint256` to custom `struct` types
- `storage` tracks the storage layout of the linearized contract, referencing the types defined in the `types` section, and is used for verifying that any storage layout changes between subsequent versions are compatible
- `warnings` tracks any existing warnings for the contract, such as whether it has a constructor or `selfdestruct` operations

Any Solidity libraries used by the project’s contracts are tracked in the `solidityLibs` node, which has the same structure as the `contracts` item.

Another thing to notice in these files are the version numbers. The `` keeps track of the latest app version, and matches `` from `project.json`. The ``, on the other hand, keeps track of which version of the contracts the proxies are pointing to. Say you deploy a contract in your app version 1.0.0, and then bump the version to 1.1.0 and push some upgraded code for that same contract. This will be reflected in the ``, but not yet in the proxy, which will display 1.0.0 in `` and the old logic contract address in ``. Once you run `oz update` to your contract, `` will show the new 1.1.0 version, and `` will point to the new ``. Note that this version identifier will refer to the version of the dependency (and not the app) if the proxy points to a dependent Ethereum Package.

The field `` contains the address of the ProxyAdmin contract, used to manage the [transparent proxy pattern](https://docs.openzeppelin.com/cli/2.7/configuration#pattern.adoc#transparent-proxies-and-function-clashes) in the project’s proxies.

Also, notice the fields ``, ``, and ``. These contain the addresses of contracts the OpenZeppelin CLI uses to facilitate the creation of proxies and the management of different versions of your contracts. These contracts will only be deployed once you `publish` your project to a desired network. That is, your project will not have an `app`, `package`, or `provider` unless explicitly running the `publish` command, or if the project was created with the `--publish` flag. Note that this step is required for projects that produce an Ethereum Package. To read more about the architecture of contracts we are using to publish your project on-chain please refer to the [Contract Architecture](https://docs.openzeppelin.com/cli/2.7/configuration#architecture.adoc) section.

Finally, the `dependencies` field stores information about linked Ethereum Packages. For each dependency, the `` tracks the address of the deployed `package` in the network, and `` is the exact semver identifier being used for the dependency. The `custom-deploy` field will be present only when a version of the Ethereum Package is deployed using the `--deploy-dependencies` flag of the `push` command, in which case `` will be `true`.

The naming of the file will be `.json`, but note that `` is not taken from the name of the network’s entry in the network file, but is instead inferred from the canonical network id associated to the entry. For example, given the following network configuration:

```json
// networks.js
module.exports = {
  networks: {
     geth_ropsten: {
      host: 'localhost',
      port: 8555,
      network_id: 3
    },
     parity_ropsten: {
      host: 'localhost',
      port: 8565,
      network_id: 3
    },
     local: {
      host: 'localhost',
      port: 8545,
      network_id: *
    }
  }
};
```

Using `oz push --network geth_ropsten` or `oz push --network parity_ropsten` will both produce a file named `ropsten.json` no matter which method was used to connect to the ropsten network. The OpenZeppelin CLI will automatically detect which public network is being referred to (using web3.network.getVersion()) and use this information for determining the file name. When dealing with local networks, the OpenZeppelin CLI will generate files with `dev-`, given that these networks are not public and don’t have a canonical name. Using `oz push --network local` will produce a file named `dev-1540303312049.json` (or some other number representing the network id of the local network).

## Configuration Files in Version Control

The `project.json` file should be tracked in version control. This file represents an OpenZeppelin project’s configuration; the contracts and Ethereum Packages that compose it, its name and version, the version of the OpenZeppelin CLI it uses, etc. The file should be identical for all the contributors of a project.

Public network files like `mainnet.json` or `ropsten.json` should also be tracked in version control. These contain valuable information about your project’s status in the corresponding network; the addresses of the contract implementations that have been deployed, the addresses of the proxies that have been deployed, etc. Such files should also be identical for all the contributors of a project.

However, local network files like `dev-.json` only represent a project’s deployment in a temporary local network such as `ganache-cli` that are only relevant to a single contributor of the project and should not be tracked in version control.

An example `.gitignore` file could contain the following entries:

```json
// .gitignore
# OpenZeppelin
.openzeppelin/dev-*.json
.openzeppelin/.session
```



