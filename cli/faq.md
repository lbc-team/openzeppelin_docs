# Frequently Asked Questions

## Can I Specify Which Solidity Compiler Version to Use in the OpenZeppelin CLI?

Yes. You can run `openzeppelin compile --solc-version 0.5.14` to compile your contracts with a specific Solidity compiler version e.g. `0.5.14`. This choice will be saved to `.openzeppelin/project.json` for future runs.

```json
// .openzeppelin/project.json
{
  "manifestVersion": "2.2",
  "name": "my-project",
  "version": "1.0.0",
  "compiler": {
    "manager": "openzeppelin",
    "solcVersion": "0.5.14"
  }
}
```

If you are using `truffle` for compiling your project, you can specify which compiler version to use in your `truffle.js` or `truffle-config.js` file, as you do normally in a truffle 5+ project:

```javascript
// truffle.js
module.exports = {
  compilers: {
     solc: {
       version: "0.5.14"
     }
  }
}
```

## Can I Change Solidity Compiler Versions When Upgrading?

Yes. The Solidity team guarantess that the compiler will [preserve the storage layout accross versions](https://twitter.com/ethchris/status/1073692785176444928).

## Why Am I Getting the Error "Cannot Call Fallback Function From the Proxy Admin"?

This is due to the [Transparent Proxy Pattern](https://docs.openzeppelin.com/upgrades/2.7/proxies#transparent-proxies-and-function-clashes). You shouldn’t get this error when using the OpenZeppelin CLI, since it relies on the `ProxyAdmin` contract for managing your proxies.

However, if you are using OpenZeppelin Upgrades programmatically you could potentially run into such error. The solution is to always interact with your proxies from an account that is not the admin of the proxy, unless you want to specifically call the functions of the proxy itself.

## How Can I Create an Upgradeable Instance From Solidity Code?

You can create upgradeable instances from Solidity code by using your project’s [`App`](https://docs.openzeppelin.com/cli/2.7/contracts-architecture#app.sol) contract, and then calling its `create` function from Solidity. Note that to be able to do this, your project needs to be published, that is, it needs to have the OpenZeppelin [Contracts Architecture](https://docs.openzeppelin.com/cli/2.7/faq#architecture.adoc) enabled.

To see an example of how this is done, please refer to the example project [`creating-instances-from-solidity`](https://github.com/OpenZeppelin/openzeppelin-sdk/tree/master/examples/creating-instances-from-solidity).

## Opt-In Usage Data Reporting

In order to better guide the development of our tools, we ask users if they would like to opt in to contributing anonymized logs of their usage of the OpenZeppelin CLI. In this document we explain exactly what data we collect and how we anonymize it. Please visit https://openzeppelin.com/privacy for further information about our privacy practices.

When you run the OpenZeppelin CLI for the first time we ask if you would like to opt in to contributing usage logs. This is a setting that will be stored globally and will apply to future projects. You can opt-out at any time, and you can also choose to opt out on a per-project basis.

If you choose to you opt in, we generate a random user identifier and a random 32-byte salt.

Every `openzeppelin` subcommand you run will be first anonymized by hashing each argument together with the random salt. Note that this only applies to user-specific arguments (e.g. the name of a contract, or an address), and not to the flags themselves (e.g. `--force`). The anonymized commands will be logged on our servers together with the random user identifier, the network that they were run in, as well as general information about the environment (platform, architecture, and versions of node, the CLI, and web3 dependencies).