# Access Control

Access control—that is, "who is allowed to do this thing"—is incredibly important in the world of smart contracts. The access control of your contract may govern who can mint tokens, vote on proposals, freeze transfers, and many other things. It is therefore **critical** to understand how you implement it, lest someone else [steals your whole system](https://blog.openzeppelin.com/on-the-parity-wallet-multisig-hack-405a8c12e8f7).

## Ownership and `Ownable`

The most common and basic form of access control is the concept of *ownership*: there’s an account that is the `owner` of a contract and can do administrative tasks on it. This approach is perfectly reasonable for contracts that have a single administrative user.

OpenZeppelin provides [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/api/ownership#Ownable) for implementing ownership in your contracts.

```solidity
pragma solidity ^0.5.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";

contract MyContract is Ownable {
    function normalThing() public {
        // anyone can call this normalThing()
    }

    function specialThing() public onlyOwner {
        // only the owner can call specialThing()!
    }
}
```

By default, the [`owner`](https://docs.openzeppelin.com/contracts/2.x/api/ownership#Ownable-owner--) of an `Ownable` contract is the account that deployed it, which is usually exactly what you want.

Ownable also lets you:

- [`transferOwnership`](https://docs.openzeppelin.com/contracts/2.x/api/ownership#Ownable-transferOwnership-address-) from the owner account to a new one, and
- [`renounceOwnership`](https://docs.openzeppelin.com/contracts/2.x/api/ownership#Ownable-renounceOwnership--) for the owner to relinquish this administrative privilege, a common pattern after an initial stage with centralized administration is over.

|      | Removing the owner altogether will mean that administrative tasks that are protected by `onlyOwner` will no longer be callable! |
| ---- | ------------------------------------------------------------ |
|      |                                                              |

Note that **a contract can also be the owner of another one**! This opens the door to using, for example, a [Gnosis Multisig](https://github.com/gnosis/MultiSigWallet) or [Gnosis Safe](https://safe.gnosis.io/), an [Aragon DAO](https://aragon.org/), an [ERC725/uPort](https://www.uport.me/) identity contract, or a totally custom contract that *you* create.

In this way you can use *composability* to add additional layers of access control complexity to your contracts. Instead of having a single regular Ethereum account (Externally Owned Account, or EOA) as the owner, you could use a 2-of-3 multisig run by your project leads, for example. Prominent projects in the space, such as [MakerDAO](https://makerdao.com/), use systems similar to this one.

## Role-Based Access Control

While the simplicity of *ownership* can be useful for simple systems or quick prototyping, different levels of authorization are often needed. An account may be able to ban users from a system, but not create new tokens. *Role-Based Access Control (RBAC)* offers flexibility in this regard.

In essence, we will be defining multiple *roles*, each allowed to perform different sets of actions. Instead of `onlyOwner` everywhere - you will use, for example, `onlyAdminRole` in some places, and `onlyModeratorRole` in others. Separately, you will be able to define rules for how accounts can be assignned a role, transfer it, and more.

Most of software development uses access control systems that are role-based: some users are regular users, some may be supervisors or managers, and a few will often have administrative privileges.

### Using `Roles`

OpenZeppelin provides [`Roles`](https://docs.openzeppelin.com/contracts/2.x/api/access#Roles) for implementing role-based access control. Its usage is straightforward: for each role that you want to define, you’ll store a variable of type `Role`, which will hold the list of accounts with that role.

Here’s a simple example of using `Roles` in an [`ERC20` token](https://docs.openzeppelin.com/contracts/2.x/tokens#ERC20): we’ll define two roles, `minters` and `burners`, that will be able to mint new tokens, and burn them, respectively.

```solidity
pragma solidity ^0.5.0;

import "@openzeppelin/contracts/access/Roles.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract MyToken is ERC20, ERC20Detailed {
    using Roles for Roles.Role;

    Roles.Role private _minters;
    Roles.Role private _burners;

    constructor(address[] memory minters, address[] memory burners)
        ERC20Detailed("MyToken", "MTKN", 18)
        public
    {
        for (uint256 i = 0; i < minters.length; ++i) {
            _minters.add(minters[i]);
        }

        for (uint256 i = 0; i < burners.length; ++i) {
            _burners.add(burners[i]);
        }
    }

    function mint(address to, uint256 amount) public {
        // Only minters can mint
        require(_minters.has(msg.sender), "DOES_NOT_HAVE_MINTER_ROLE");

        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public {
        // Only burners can burn
        require(_burners.has(msg.sender), "DOES_NOT_HAVE_BURNER_ROLE");

       _burn(from, amount);
    }
}
```

So clean! By splitting concerns this way, much more granular levels of permission may be implemented than were possible with the simpler *ownership* approach to access control. Note that an account may have more than one role, if desired.

OpenZeppelin uses `Roles` extensively with predefined contracts that encode rules for each specific role. A few examples are: [`ERC20Mintable`](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#ERC20Mintable) which uses the [`MinterRole`](https://docs.openzeppelin.com/contracts/2.x/api/access#MinterRole) to determine who can mint tokens, and [`WhitelistCrowdsale`](https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#WhitelistCrowdsale) which uses both [`WhitelistAdminRole`](https://docs.openzeppelin.com/contracts/2.x/api/access#WhitelistAdminRole) and [`WhitelistedRole`](https://docs.openzeppelin.com/contracts/2.x/api/access#WhitelistedRole) to create a set of accounts that can purchase tokens.

This flexibility allows for interesting setups: for example, a [`MintedCrowdsale`](https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#MintedCrowdsale) expects to be given the `MinterRole` of an `ERC20Mintable` in order to work, but the token contract could also extend [`ERC20Pausable`](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#ERC20Pausable) and assign the [`PauserRole`](https://docs.openzeppelin.com/contracts/2.x/api/access#PauserRole) to a DAO that serves as a contingency mechanism in case a vulnerability is discovered in the contract code. Limiting what each component of a system is able to do is known as the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege), and is a good security practice.

## Usage in OpenZeppelin

You’ll notice that none of the OpenZeppelin contracts use `Ownable`. `Roles` is a prefferred solution, because it provides the user of the library with enough flexibility to adapt the provided contracts to their needs.

There are some cases, however, where there’s a direct relationship between contracts. For example, [`RefundableCrowdsale`](https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#RefundableCrowdsale) deploys a [`RefundEscrow`](https://docs.openzeppelin.com/contracts/2.x/api/payment#RefundEscrow) on construction, to hold its funds. For those cases, we’ll use [`Secondary`](https://docs.openzeppelin.com/contracts/2.x/api/ownership#Secondary) to create a *secondary* contract that allows a *primary* contract to manage it. You could also think of these as *auxiliary* contracts.