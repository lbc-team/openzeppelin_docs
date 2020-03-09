# Compiling

The OpenZeppelin CLI integrates the Solidity compiler to seamlessly compile your Solidity contracts into Ethereum Virtual Machine (EVM) bytecode.

This guide covers how compiling works, its different options, and the output format.

## Running the Compiler

Most CLI commands, like `oz create` or `oz upgrade`, will automatically compile your projects smart contracts when required, so you don’t need to worry about doing this yourself.

However, you can also just run the compilation by itself, using the [`oz compile`](https://docs.openzeppelin.com/cli/2.7/commands#compile) command:

```console
$ npx oz compile
```

When executed for the first time, all smart contracts in the `contracts` directory will be compiled at once. Further invocations of `compile` however will *only* compile contracts that have changed (along with their dependents), speeding up the process.

## Settings

All compilation settings are passed directly to the Solidity compiler. Check out its [documentation](https://solidity.readthedocs.io/en/v0.5.15/using-the-compiler.html) for more info on how each setting affects compilation.

### Picking a Compiler Version

Each Solidity source files should be annotated with a [version pragma](https://solidity.readthedocs.io/en/v0.5.15/layout-of-source-files.html#version-pragma) that indicates which compiler versions can be used to compile it.

The CLI will parse all of these declarations and automatically select the latest compiler version that matches all your version pragmas. This single version will be the one used to compile *all* of your contracts.

|      | It is often best to use permissive pragmas, such as `^0.5.0` or `^0.6.0` (which select the 0.5.x and 0.6.x lines of the compiler, respectively), and let the CLI do the rest. |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

Alternatively, you can also specify a compiler version when calling `oz compile` by using the `--solc-version` option:

```console
$ npx oz compile --solc-version 0.5.14
```

In all cases, the selected Solidity compiler version will be automatically downloaded and saved to cache from the [official distribution list](https://solc-bin.ethereum.org/bin/list.json). Once the version is set, subsequent compilations will [use that same version](https://docs.openzeppelin.com/cli/2.7/compiling#saving-your-settings).

|      | For enhanced performance, you can [install the native Solidity binaries](https://solidity.readthedocs.io/en/v0.5.15/installing-solidity.html#binary-packages) on your machine: the CLI will automatically pick it up when compiling if it matches the target version. Massive speedups can be achieved by doing this, specially on large projects. Just make sure it’s available on your [`PATH`](https://en.wikipedia.org/wiki/PATH_(variable))!. |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

### Picking an EVM Version

Each version of the Solidity compiler ships with a default [EVM version](https://solidity.readthedocs.io/en/v0.5.15/using-the-compiler.html#setting-the-evm-version-to-target), which corresponds to the mainnet EVM version at the time of release. The CLI will respect these defaults unless otherwise instructed.

In some occasions, it may be necessary to select a specific EVM version. This is achieved via the `--evm-version` flag:

```console
$ npx oz compile --evm-version berlin
```

### Using the Optimizer

The Solidity compiler features an optional optimizer: it can produce smaller and more gas-efficient EVM bytecode, at the cost of making it harder to understand.

The optimizer is enabled or disabled with the `--optimizer` option:

```console
$ npx oz compile --optimizer on
```

For fine tuning, you can also pass the `--optimizer-runs` option. This number should be an estimate of how many times you expect your smart contract to be called: pass 1 for one-offs, or a higher number for regularly used contracts. The default value is 200.

```console
$ npx oz compile --optimizer on --optimizer-runs 100
```

|      | Don’t worry if you’re not sure what value to pass to `--optimizer-runs`: the gains achieved by using this parameter correctly are very limited. |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

### Saving Your Settings

All compilation settings, including compiler version, EVM version and optimizer configuration are stored in your [project configuration file](https://docs.openzeppelin.com/cli/2.7/configuration#project.json), will be used in all successive compilations.

To modify these settings, run `oz compile` with the newly desired values, or simply edit the configuration file manually.

## Compilation Results

### Storing Compiled Artifacts

The output of the compiler is a number of `.json` files (one per compiled contract), which hold all relevant information: compiler settings, copies of the source, and most importantly, the resulting ABI and bytecode. These files are stored in the `build/contracts` directory, which the CLI will create for you automatically.

|      | These files can be large, and since compilation is a fast process it’s often a good idea to add this directory to your `.gitignore`:` // .gitignore +build/contracts` |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

### Loading Your Contracts

The format of the `.json` artifacts is standard, and compatible with all major smart contract tools out there, such as Truffle, Buidler, and Etherlime.

If you want to load your compiled contracts and interact with them from JavaScript code, we recommend using the [**OpenZeppelin Contract Loader**](https://docs.openzeppelin.com/contract-loader/0.6/):

```javascript
const { setupLoader } = require('@openzeppelin/contract-loader');

const loader = setupLoader({
  provider,        // either a web3 provider or a web3 instance
  defaultSender,   // optional
});

// Load build/contracts/ERC20.json
const ERC20 = loader.web3.fromArtifact('ERC20');

// Deploy contract
const token = await ERC20.deploy().send();

// Query state and send transaction
const balance = await token.methods.balanceOf(sender).call();
await token.methods.transfer(receiver, balance).send({ from: sender });
```

