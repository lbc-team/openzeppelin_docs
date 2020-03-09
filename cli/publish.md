# Publishing an Ethereum Package

In [Using Dependencies](https://docs.openzeppelin.com/cli/2.7/dependencies), we showed how to use the [`oz link`](https://docs.openzeppelin.com/cli/2.7/commands#link) command to use the [OpenZeppelin Contracts Ethereum Package](https://github.com/OpenZeppelin/openzeppelin-contracts-ethereum-package) as a dependency, taking advantage of its contracts being *already deployed on the blockchain*.

In this guide we’ll describe how you can create your own Ethereum Package, and make it available to everyone via the OpenZeppelin CLI.

|      | This guide features advanced usage of OpenZeppelin tools, and requires familiarity with using public networks, upgradeable contracts, and the OpenZeppelin CLI.For a refresher on the topics, head to [Deploying to a Public Test Network](https://docs.openzeppelin.com/cli/2.7/publishing-ethereum-package#learn::public-staging.adoc) and [Upgrades](https://docs.openzeppelin.com/cli/2.7/publishing-ethereum-package#learn::on-upgrades.adoc). |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

## Storing Your Project On-chain

So far, we’ve mostly limited ourselves to depoying contracts using [`oz create`](https://docs.openzeppelin.com/cli/2.7/commands#create), which creates *upgradeable instances* by deploying *proxies* to an existing implementation contract (refer to [How Upgrades Work](https://docs.openzeppelin.com/cli/2.7/publishing-ethereum-package#learn::on-upgrades.adoc#how-upgrades-work) to brush up on this). Here, we will instead deploy just the implementations, so that other people can create new proxies pointing to them.

To achieve this, we’ll use two low-level CLI commands: [`oz add`](https://docs.openzeppelin.com/cli/2.7/commands#add) and [`oz push`](https://docs.openzeppelin.com/cli/2.7/commands#push). These work simmilarly to `git add` and `git push`: they will register contracts in your project and deploy them to a network.

In your [OpenZeppelin project](https://docs.openzeppelin.com/cli/2.7/getting-started#setting-up-your-project), run:

```console
$ npx oz add
? Pick which contracts you want to add <contract-1>, <contract-2>
✓ Added contract <contract-1>
✓ Added contract <contract-2>
All the selected contracts have been added to the project
$ npx oz push
? Pick a network mainnet
✓ Contract <contract-1> deployed
✓ Contract <contract-2> deployed
All contracts have been deployed
```

|      | For your Ethereum Pacakge to be used by others, it needs to be deployed on a real network instead of a local one. Take a look at [Deploying to a Public Test Network](https://docs.openzeppelin.com/cli/2.7/publishing-ethereum-package#learn::public-staging.adoc) for detailed instructions for this process. |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

Ethereum Packages are upgradeable, which means they track the different implementation contracts that correspond to each version of the package. We’ll use the [`oz publish`](https://docs.openzeppelin.com/cli/2.7/commands#publish) command for this, which will deploy an [`App`](https://docs.openzeppelin.com/cli/2.7/contracts-architecture#app.sol) contract and register the implementations there:

```console
$ npx oz publish
? Pick a network mainnet
✓ Project structure deployed
✓ Registering <contract-1> at 0x2c2eB5B599C2C4Bb2cA7e43179585aFec0D97D51 in directory
✓ Registering <contract-2> at 0x6389e6409Ad106aF5e7e6bE8D95Fca637980fB63 in directory
✓ Published to mainnet!
```

The Ethereum Package is complete! But we’re still lacking something: a convenient way to tell people about its existence.

## Distributing With `npm`

For your Ethereum Package to [usable from other projects](https://docs.openzeppelin.com/cli/2.7/dependencies), it needs to be published on the [npm registry](https://www.npmjs.com/). If you havent’t published an npm package before, go ahead and [sign up for a free npm account](https://www.npmjs.com/signup).

First, add your contract sources, compiled artifacts and OpenZeppelin project files to your package by including the following entries in your project’s `package.json`:

```diff
 // package.json
 {
   ...,
   "files": [
+    "build",
+    "contracts",
+    ".openzeppelin/*.json"
   ]
 }
```

|      | The files in your `.openzeppelin` directory that [should not be tracked in version control](https://docs.openzeppelin.com/cli/2.7/configuration#configuration-files-in-version-control) are not required to be part of your published npm package: remove them before publishing to the registry. |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

Almost done! Log into npm and upload your package with:

```console
$ npm login
$ npm publish
```

Success! The Ethereum Package is now live on the blockchain, and accessible to everyone via the npm registry.

Any OpenZeppelin project can now [link](https://docs.openzeppelin.com/cli/2.7/commands#link) to your package:

```console
$ npx oz link <your-project-name>
```

|      | Your Ethereum Package’s name is the same one you provided [during initialization](https://docs.openzeppelin.com/cli/2.7/getting-started#setting-up-your-project). |
| ---- | ------------------------------------------------------------ |
|      |                                                              |