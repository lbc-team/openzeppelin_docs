# ERC20

An ERC20 token contract keeps track of [*fungible* tokens](https://docs.openzeppelin.com/contracts/2.x/tokens#different-kinds-of-tokens): any one token is exactly equal to any other token; no tokens have special rights or behavior associated with them. This makes ERC20 tokens useful for things like a **medium of exchange currency**, **voting rights**, **staking**, and more.

OpenZeppelin Contracts provides many ERC20-related contracts. On the [`API reference`](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20) you’ll find detailed information on their properties and usage.

## Constructing an ERC20 Token Contract

Using Contracts, we can easily create our own ERC20 token contract, which will be used to track *Gold* (GLD), an internal currency in a hypothetical game.

Here’s what our GLD token might look like.

```solidity
pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract GLDToken is ERC20, ERC20Detailed {
    constructor(uint256 initialSupply) ERC20Detailed("Gold", "GLD", 18) public {
        _mint(msg.sender, initialSupply);
    }
}
```

Our contracts are often used via [inheritance](https://solidity.readthedocs.io/en/latest/contracts.html#inheritance), and here we’re reusing [`ERC20`](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#erc20) for the basic standard implementation and [`ERC20Detailed`](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#ERC20Detailed) to get the [`name`](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#ERC20Detailed-name--), [`symbol`](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#ERC20Detailed-symbol--), and [`decimals`](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#ERC20Detailed-decimals--) properties. Additionally, we’re creating an `initialSupply` of tokens, which will be assigned to the address that deploys the contract.

|      | For a more complete discussion of ERC20 supply mechanisms, see [Creating ERC20 Supply](https://docs.openzeppelin.com/contracts/2.x/erc20-supply). |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

That’s it! Once deployed, we will be able to query the deployer’s balance:

```javascript
> GLDToken.balanceOf(deployerAddress)
1000
```

We can also [transfer](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-transfer-address-uint256-) these tokens to other accounts:

```javascript
> GLDToken.transfer(otherAddress, 300)
> GLDToken.balanceOf(otherAddress)
300
> GLDToken.balanceOf(deployerAddress)
700
```

## A Note on `decimals`

Often, you’ll want to be able to divide your tokens into arbitrary amounts: say, if you own `5 GLD`, you may want to send `1.5 GLD` to a friend, and keep `3.5 GLD` to yourself. Unfortunately, Solidity and the EVM do not support this behavior: only integer (whole) numbers can be used, which poses an issue. You may send `1` or `2` tokens, but not `1.5`.

To work around this, [`ERC20Detailed`](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#ERC20Detailed) provides a [`decimals`](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#ERC20Detailed-decimals--) field, which is used to specify how many decimal places a token has. To be able to transfer `1.5 GLD`, `decimals` must be at least `1`, since that number has a single decimal place.

How can this be achieved? It’s actually very simple: a token contract can use larger integer values, so that a balance of `50` will represent `5 GLD`, a transfer of `15` will correspond to `1.5 GLD` being sent, and so on.

It is important to understand that `decimals` is *only used for display purposes*. All arithmetic inside the contract is still performed on integers, and it is the different user interfaces (wallets, exchanges, etc.) that must adjust the displayed values according to `decimals`. The total token supply and balance of each account are not specified in `GLD`: you need to divide by `10^decimals` to get the actual `GLD` amount.

You’ll probably want to use a `decimals` value of `18`, just like Ether and most ERC20 token contracts in use, unless you have a very special reason not to. When minting tokens or transferring them around, you will be actually sending the number `num GLD * 10^decimals`.

So if you want to send `5` tokens using a token contract with 18 decimals, the the method to call will actually be:

```solidity
transfer(recipient, 5 * 10^18);
```