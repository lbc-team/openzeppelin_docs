# Deploying Smart Contracts Using `CREATE2`

The [`CREATE2`](https://eips.ethereum.org/EIPS/eip-1014) opcode gives us the ability predict the address where a contract will be deployed, without ever having to do so. This opens up lots of possibilities to improve [user onboarding and scalability](https://blog.openzeppelin.com/getting-the-most-out-of-create2/).

In this guide we will precompute the address where a contract will be deployed and send Ether to it. Then, we’ll deploy an upgradeable contract to that same address, and use it to retrieve the funds previously sent there.

> This guide features advanced usage of OpenZeppelin tools, and requires familiarity with Solidity, development blockchains and the OpenZeppelin CLI.For a refresher on the topics, head to [Deploying and Interacting With Smart Contracts](https://docs.openzeppelin.com/cli/2.7/deploying-with-create2#learn::deploy-and-interact.adoc).



## Creating a Smart Contract

There are two major ways in which a smart contract can be deployed: with the `CREATE` and `CREATE2` flows. We’ll go through a short overview of how they work and their core difference.

> If you are already familiar with the goals behind `CREATE2`, feel free to [skip ahead](https://docs.openzeppelin.com/cli/2.7/deploying-with-create2#create2-from-the-cli).  

### `CREATE`

Smart contracts can be created both by other contracts (using [Solidity’s `new` keyword](https://solidity.readthedocs.io/en/v0.5.15/control-structures.html#creating-contracts-via-new)) and by regular accounts (such as when running [`oz create`](https://docs.openzeppelin.com/cli/2.7/commands#create)). In both cases, the address for the new contract is computed the same way: as a function of the sender’s own address and a nonce.

```console
new_address = hash(sender, nonce)
```

Every account has an associated nonce: for regular accounts it is increased on every transaction, while for contract accounts it is increased on every contract creation. Nonces cannot be reused, and they must be sequential.

This means it is possible to predict the address where the *next* created contract will be deployed, but *only* if no other transactions happen before then - an undesirable property for counterfactual systems.

### `CREATE2`

The whole idea behind this opcode is to make the resulting address *independent of future events*. Regardless of what may happen on the blockchain, it will always be possible to deploy the contract at the precomputed address.

New addresses are a function of:

- `0xFF`, a constant that prevents collisions with `CREATE`
- The sender’s own address
- A salt (an arbitrary value provided by the sender)
- The to-be-deployed contract’s bytecode

```console
new_address = hash(0xFF, sender, salt, bytecode)
```

`CREATE2` guarantees that if `sender` ever deploys `bytecode` using `CREATE2` and the provided `salt`, it will be stored in `new_address`.

Because `bytecode` is included in this computation other agents can *rely* on the fact that, if a contract is ever deployed to `new_address`, it will be one they know about. This is the key concept behind counterfactual deployments.

## Using `CREATE2` From the CLI

Because `CREATE2` is an EVM opcode, it is normally only usable by smart contracts and not external accounts. However, the OpenZeppelin CLI provides a handy way of running `CREATE2`-like deployments directly from the terminal.

We’ll begin by [initializing a new OpenZeppelin project](https://docs.openzeppelin.com/cli/2.7/getting-started#setting-up-your-project) with a `Vault` contract:

```solidity
// contracts/Vault.sol
pragma solidity ^0.5.0;

import "@openzeppelin/upgrades/contracts/Initializable.sol";

contract Vault is Initializable {
    address payable owner;

    function initialize(address payable _owner) initializer public {
        owner = _owner;
    }

    function withdraw() public {
        require(owner == msg.sender);
        owner.transfer(address(this).balance);
    }
}
```

We will compute the address where `Vault` will be deployed, and send Ether there. Then, we will deploy `Vault` using `CREATE2` and call the `withdraw` method, retrieving the funds that were sent to it before deployment.

|      | While this simple example may sound silly, being able to interact with contracts that don’t yet exist is an extremely powerful tool, and is the key building block behind state channels, onboarding solutions and front-running prevention schemes. |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

## Computing the Deployment Address

Recall that only smart contracts can use `CREATE2`: for the OpenZeppelin CLI to be able to provide equivalent behavior, we’ll need to do some setup first.

Under the hood, the CLI will use a contract factory to [deploy upgradeable contracts from Solidity](https://docs.openzeppelin.com/upgrades/2.7/creating-upgradeable-from-solidity). This means we’ll need to use two low-level CLI commands that don’t come into play often: [`oz add`](https://docs.openzeppelin.com/cli/2.7/commands#add) and [`oz push`](https://docs.openzeppelin.com/cli/2.7/commands#push):

```console
$ npx oz add
? Pick which contracts you want to add Vault
✓ Added contract Vault
$ npx oz push
✓ Contract Vault deployed
All contracts have been deployed
```

|      | You can safely use `CREATE2` without understanding what is going on behind the scenes, but if you want to get down to the gory details, start by learning about [OpenZeppelin Upgrades proxies](https://docs.openzeppelin.com/upgrades/2.7/proxies). |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

With this setup out of the way, we can *query* the CLI for the address where our contracts will be deployed using an arbitrary `salt` by calling [`oz create2`](https://docs.openzeppelin.com/cli/2.7/commands#create2):

```console
$ npx oz create2 --query --salt 12345 --network development
✓ Deployed ProxyFactory at 0x4e08589Cd399474157f24f591B9fB100D1adD5d9

Any contract created with salt 12345 will be deployed to the following address
0x4e08589Cd399474157f24f591B9fB100D1adD5d9
```

Neat! We can now interact with the computed address, knowing we’ll later be able to deploy a contract there.

## Interacting With the Counterfactual Contract

Under normal circumstances, sending funds to a random Ethereum address is a bad idea. Here however, we know we’ll be able to deploy `Vault` at the computed address and retrieve our funds. So let’s do it!

The easiest way to send Ether is by using [`oz transfer`](https://docs.openzeppelin.com/cli/2.7/commands#transfer):

```console
$ $ npx oz transfer
? Pick a network development
? Choose the account to send transactions from (0) 0xA84577357099567A750f542C2C002B0aA680d477
? Enter the receiver account 0x98329e006610472e6B372C080833f6D79ED833cf
? Enter an amount to transfer 10 ether
✓ Funds sent. Transaction hash: 0x9cff31198a80cefb9541e5cf406433f985490a4d786b72bb7e07139ae293657d
```

Because the address has no bytecode and we don’t have its private keys, we cannot do much with it other than checking the funds are indeed there:

```console
$ npx oz balance
? Enter an address to query its balance 0x98329e006610472e6B372C080833f6D79ED833cf
Balance: 10 ETH
```

Let’s get them back.

## Withdrawing From Our `Vault`

`CREATE2` dpeloyments are performed using the same [`oz create2`](https://docs.openzeppelin.com/cli/2.7/commands#create2) command, this time without the `--query` option.

Recall that `Vault` has an `initialize` method for its owner: we’ll call it with one of the accounts we control.

```console
$ npx oz create2 Vault --salt 12345 --init --args 0xA84577357099567A750f542C2C002B0aA680d477 --network development
✓ Instance created at 0x98329e006610472e6B372C080833f6D79ED833cf
```

If all went well, we should now be able to `withdraw` from our `Vault`:

```console
$ npx oz send-tx
? Pick a network development
? Pick an instance Vault at 0x272F769068bDB8740e44E6e0E852b97c8C4865b0
? Select which function withdraw()

✓ Transaction successful. Transaction hash: 0xb0a67ba8a198a0d86814519ed12de8fbeaaaab151ae3b70f67a608236627ec4b
```

Success! Just to be sure, let’s verify the `Vault` is indeed empty:

```console
$ npx oz balance
? Enter an address to query its balance 0x98329e006610472e6B372C080833f6D79ED833cf
Balance: 0 ETH
```

We’ve sent funds to an address we preocumputed, knowing we’d be later able to deploy a contract there and retrieve them. As as a bonus, our `Vault` contract can be upgraded via [`oz upgrade`](https://docs.openzeppelin.com/cli/2.7/commands#upgrade)!