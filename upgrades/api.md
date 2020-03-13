# API Reference

## Proxies

### `Proxy`

Implements delegation of calls to other contracts, with proper forwarding of return values and bubbling of failures. It defines a fallback function that delegates all calls to the address returned by the abstract _implementation() internal function.

FUNCTIONS

- [`fallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-fallback--)
- [`_implementation()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_implementation--)
- [`_delegate(implementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_delegate-address-)
- [`_willFallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_willFallback--)
- [`_fallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_fallback--)

#### `fallback()`external

Fallback function. Implemented entirely in `_fallback`.

#### `_implementation() → address`internal

#### `_delegate(address implementation)`internal

Delegates execution to an implementation contract. This is a low level function that doesn’t return to its internal call site. It will return to the external caller whatever the implementation returns.

#### `_willFallback()`internal

Function that is run as the first thing in the fallback function. Can be redefined in derived contracts to add functionality. Redefinitions must call super._willFallback().

#### `_fallback()`internal

fallback implementation. Extracted to enable manual triggering.

### `UpgradeabilityProxy`

Extends BaseUpgradeabilityProxy with a constructor for initializing implementation and init data.

FUNCTIONS

- [`constructor(_logic, _data)`](https://docs.openzeppelin.com/upgrades/2.7/api#UpgradeabilityProxy-constructor-address-bytes-)

BASEUPGRADEABILITYPROXY

- [`_implementation()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-_implementation--)
- [`_upgradeTo(newImplementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-_upgradeTo-address-)
- [`_setImplementation(newImplementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-_setImplementation-address-)

PROXY

- [`fallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-fallback--)
- [`_delegate(implementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_delegate-address-)
- [`_willFallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_willFallback--)
- [`_fallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_fallback--)

EVENTS

BASEUPGRADEABILITYPROXY

- [`Upgraded(implementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-Upgraded-address-)

#### `constructor(address _logic, bytes _data)`public

Contract constructor.

### `AdminUpgradeabilityProxy`

Extends from BaseAdminUpgradeabilityProxy with a constructor for initializing the implementation, admin, and init data.

MODIFIERS

BASEADMINUPGRADEABILITYPROXY

- [`ifAdmin()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-ifAdmin--)

FUNCTIONS

- [`constructor(_logic, _admin, _data)`](https://docs.openzeppelin.com/upgrades/2.7/api#AdminUpgradeabilityProxy-constructor-address-address-bytes-)

UPGRADEABILITYPROXY

- [`constructor(_logic, _data)`](https://docs.openzeppelin.com/upgrades/2.7/api#UpgradeabilityProxy-constructor-address-bytes-)

BASEADMINUPGRADEABILITYPROXY

- [`admin()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-admin--)
- [`implementation()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-implementation--)
- [`changeAdmin(newAdmin)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-changeAdmin-address-)
- [`upgradeTo(newImplementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-upgradeTo-address-)
- [`upgradeToAndCall(newImplementation, data)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-upgradeToAndCall-address-bytes-)
- [`_admin()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-_admin--)
- [`_setAdmin(newAdmin)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-_setAdmin-address-)
- [`_willFallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-_willFallback--)

BASEUPGRADEABILITYPROXY

- [`_implementation()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-_implementation--)
- [`_upgradeTo(newImplementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-_upgradeTo-address-)
- [`_setImplementation(newImplementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-_setImplementation-address-)

PROXY

- [`fallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-fallback--)
- [`_delegate(implementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_delegate-address-)
- [`_fallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_fallback--)

EVENTS

BASEADMINUPGRADEABILITYPROXY

- [`AdminChanged(previousAdmin, newAdmin)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-AdminChanged-address-address-)

BASEUPGRADEABILITYPROXY

- [`Upgraded(implementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-Upgraded-address-)

#### `constructor(address _logic, address _admin, bytes _data)`public

### `BaseAdminUpgradeabilityProxy`

This contract combines an upgradeability proxy with an authorization mechanism for administrative tasks. All external functions in this contract must be guarded by the `ifAdmin` modifier. See ethereum/solidity#3864 for a Solidity feature proposal that would enable this to be done automatically.

MODIFIERS

- [`ifAdmin()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-ifAdmin--)

FUNCTIONS

- [`admin()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-admin--)
- [`implementation()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-implementation--)
- [`changeAdmin(newAdmin)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-changeAdmin-address-)
- [`upgradeTo(newImplementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-upgradeTo-address-)
- [`upgradeToAndCall(newImplementation, data)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-upgradeToAndCall-address-bytes-)
- [`_admin()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-_admin--)
- [`_setAdmin(newAdmin)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-_setAdmin-address-)
- [`_willFallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-_willFallback--)

BASEUPGRADEABILITYPROXY

- [`_implementation()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-_implementation--)
- [`_upgradeTo(newImplementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-_upgradeTo-address-)
- [`_setImplementation(newImplementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-_setImplementation-address-)

PROXY

- [`fallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-fallback--)
- [`_delegate(implementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_delegate-address-)
- [`_fallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_fallback--)

EVENTS

- [`AdminChanged(previousAdmin, newAdmin)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-AdminChanged-address-address-)

BASEUPGRADEABILITYPROXY

- [`Upgraded(implementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-Upgraded-address-)

#### `ifAdmin()`modifier

Modifier to check whether the `msg.sender` is the admin. If it is, it will run the function. Otherwise, it will delegate the call to the implementation.

#### `admin() → address`external

#### `implementation() → address`external

#### `changeAdmin(address newAdmin)`external

Changes the admin of the proxy. Only the current admin can call this function.

#### `upgradeTo(address newImplementation)`external

Upgrade the backing implementation of the proxy. Only the admin can call this function.

#### `upgradeToAndCall(address newImplementation, bytes data)`external

Upgrade the backing implementation of the proxy and call a function on the new implementation. This is useful to initialize the proxied contract.

#### `_admin() → address adm`internal

#### `_setAdmin(address newAdmin)`internal

Sets the address of the proxy admin.

#### `_willFallback()`internal

Only fall back when the sender is not the admin.

#### `AdminChanged(address previousAdmin, address newAdmin)`event

Emitted when the administration has been transferred.

### `BaseUpgradeabilityProxy`

This contract implements a proxy that allows to change the implementation address to which it will delegate. Such a change is called an implementation upgrade.

FUNCTIONS

- [`_implementation()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-_implementation--)
- [`_upgradeTo(newImplementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-_upgradeTo-address-)
- [`_setImplementation(newImplementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-_setImplementation-address-)

PROXY

- [`fallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-fallback--)
- [`_delegate(implementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_delegate-address-)
- [`_willFallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_willFallback--)
- [`_fallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_fallback--)

EVENTS

- [`Upgraded(implementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-Upgraded-address-)

#### `_implementation() → address impl`internal

Returns the current implementation.

#### `_upgradeTo(address newImplementation)`internal

Upgrades the proxy to a new implementation.

#### `_setImplementation(address newImplementation)`internal

Sets the implementation address of the proxy.

#### `Upgraded(address implementation)`event

Emitted when the implementation is upgraded.

### `InitializableAdminUpgradeabilityProxy`

Extends from BaseAdminUpgradeabilityProxy with an initializer for initializing the implementation, admin, and init data.

MODIFIERS

BASEADMINUPGRADEABILITYPROXY

- [`ifAdmin()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-ifAdmin--)

FUNCTIONS

- [`initialize(_logic, _admin, _data)`](https://docs.openzeppelin.com/upgrades/2.7/api#InitializableAdminUpgradeabilityProxy-initialize-address-address-bytes-)

INITIALIZABLEUPGRADEABILITYPROXY

- [`initialize(_logic, _data)`](https://docs.openzeppelin.com/upgrades/2.7/api#InitializableUpgradeabilityProxy-initialize-address-bytes-)

BASEADMINUPGRADEABILITYPROXY

- [`admin()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-admin--)
- [`implementation()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-implementation--)
- [`changeAdmin(newAdmin)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-changeAdmin-address-)
- [`upgradeTo(newImplementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-upgradeTo-address-)
- [`upgradeToAndCall(newImplementation, data)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-upgradeToAndCall-address-bytes-)
- [`_admin()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-_admin--)
- [`_setAdmin(newAdmin)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-_setAdmin-address-)
- [`_willFallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-_willFallback--)

BASEUPGRADEABILITYPROXY

- [`_implementation()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-_implementation--)
- [`_upgradeTo(newImplementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-_upgradeTo-address-)
- [`_setImplementation(newImplementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-_setImplementation-address-)

PROXY

- [`fallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-fallback--)
- [`_delegate(implementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_delegate-address-)
- [`_fallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_fallback--)

EVENTS

BASEADMINUPGRADEABILITYPROXY

- [`AdminChanged(previousAdmin, newAdmin)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseAdminUpgradeabilityProxy-AdminChanged-address-address-)

BASEUPGRADEABILITYPROXY

- [`Upgraded(implementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-Upgraded-address-)

#### `initialize(address _logic, address _admin, bytes _data)`public

### `InitializableUpgradeabilityProxy`

Extends BaseUpgradeabilityProxy with an initializer for initializing implementation and init data.

FUNCTIONS

- [`initialize(_logic, _data)`](https://docs.openzeppelin.com/upgrades/2.7/api#InitializableUpgradeabilityProxy-initialize-address-bytes-)

BASEUPGRADEABILITYPROXY

- [`_implementation()`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-_implementation--)
- [`_upgradeTo(newImplementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-_upgradeTo-address-)
- [`_setImplementation(newImplementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-_setImplementation-address-)

PROXY

- [`fallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-fallback--)
- [`_delegate(implementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_delegate-address-)
- [`_willFallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_willFallback--)
- [`_fallback()`](https://docs.openzeppelin.com/upgrades/2.7/api#Proxy-_fallback--)

EVENTS

BASEUPGRADEABILITYPROXY

- [`Upgraded(implementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#BaseUpgradeabilityProxy-Upgraded-address-)

#### `initialize(address _logic, bytes _data)`public

Contract initializer.

### `ProxyAdmin`

This contract is the admin of a proxy, and is in charge of upgrading it as well as transferring it to another admin.

MODIFIERS

OPENZEPPELINUPGRADESOWNABLE

- [`onlyOwner()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-onlyOwner--)

FUNCTIONS

- [`getProxyImplementation(proxy)`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyAdmin-getProxyImplementation-contract-AdminUpgradeabilityProxy-)
- [`getProxyAdmin(proxy)`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyAdmin-getProxyAdmin-contract-AdminUpgradeabilityProxy-)
- [`changeProxyAdmin(proxy, newAdmin)`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyAdmin-changeProxyAdmin-contract-AdminUpgradeabilityProxy-address-)
- [`upgrade(proxy, implementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyAdmin-upgrade-contract-AdminUpgradeabilityProxy-address-)
- [`upgradeAndCall(proxy, implementation, data)`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyAdmin-upgradeAndCall-contract-AdminUpgradeabilityProxy-address-bytes-)

OPENZEPPELINUPGRADESOWNABLE

- [`constructor()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-constructor--)
- [`owner()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-owner--)
- [`isOwner()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-isOwner--)
- [`renounceOwnership()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-renounceOwnership--)
- [`transferOwnership(newOwner)`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-transferOwnership-address-)
- [`_transferOwnership(newOwner)`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-_transferOwnership-address-)

EVENTS

OPENZEPPELINUPGRADESOWNABLE

- [`OwnershipTransferred(previousOwner, newOwner)`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-OwnershipTransferred-address-address-)

#### `getProxyImplementation(contract AdminUpgradeabilityProxy proxy) → address`public

Returns the current implementation of a proxy. This is needed because only the proxy admin can query it.

#### `getProxyAdmin(contract AdminUpgradeabilityProxy proxy) → address`public

Returns the admin of a proxy. Only the admin can query it.

#### `changeProxyAdmin(contract AdminUpgradeabilityProxy proxy, address newAdmin)`public

Changes the admin of a proxy.

#### `upgrade(contract AdminUpgradeabilityProxy proxy, address implementation)`public

Upgrades a proxy to the newest implementation of a contract.

#### `upgradeAndCall(contract AdminUpgradeabilityProxy proxy, address implementation, bytes data)`public

Upgrades a proxy to the newest implementation of a contract and forwards a function call to it. This is useful to initialize the proxied contract.

### `ProxyFactory`

FUNCTIONS

- [`constructor()`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyFactory-constructor--)
- [`deployMinimal(_logic, _data)`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyFactory-deployMinimal-address-bytes-)
- [`deploy(_salt, _logic, _admin, _data)`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyFactory-deploy-uint256-address-address-bytes-)
- [`deploySigned(_salt, _logic, _admin, _data, _signature)`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyFactory-deploySigned-uint256-address-address-bytes-bytes-)
- [`getDeploymentAddress(_salt, _sender)`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyFactory-getDeploymentAddress-uint256-address-)
- [`getSigner(_salt, _logic, _admin, _data, _signature)`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyFactory-getSigner-uint256-address-address-bytes-bytes-)
- [`_deployProxy(_salt, _logic, _admin, _data, _sender)`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyFactory-_deployProxy-uint256-address-address-bytes-address-)
- [`_createProxy(_salt, _sender)`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyFactory-_createProxy-uint256-address-)
- [`_getSalt(_salt, _sender)`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyFactory-_getSalt-uint256-address-)

EVENTS

- [`ProxyCreated(proxy)`](https://docs.openzeppelin.com/upgrades/2.7/api#ProxyFactory-ProxyCreated-address-)

#### `constructor()`public

#### `deployMinimal(address _logic, bytes _data) → address proxy`public

#### `deploy(uint256 _salt, address _logic, address _admin, bytes _data) → address`public

#### `deploySigned(uint256 _salt, address _logic, address _admin, bytes _data, bytes _signature) → address`public

#### `getDeploymentAddress(uint256 _salt, address _sender) → address`public

#### `getSigner(uint256 _salt, address _logic, address _admin, bytes _data, bytes _signature) → address`public

#### `_deployProxy(uint256 _salt, address _logic, address _admin, bytes _data, address _sender) → address`internal

#### `_createProxy(uint256 _salt, address _sender) → contract InitializableAdminUpgradeabilityProxy`internal

#### `_getSalt(uint256 _salt, address _sender) → bytes32`internal

#### `ProxyCreated(address proxy)`event

## Application

### `App`

Contract for upgradeable applications. It handles the creation of proxies.

MODIFIERS

OPENZEPPELINUPGRADESOWNABLE

- [`onlyOwner()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-onlyOwner--)

FUNCTIONS

- [`constructor()`](https://docs.openzeppelin.com/upgrades/2.7/api#App-constructor--)
- [`getProvider(packageName)`](https://docs.openzeppelin.com/upgrades/2.7/api#App-getProvider-string-)
- [`getPackage(packageName)`](https://docs.openzeppelin.com/upgrades/2.7/api#App-getPackage-string-)
- [`setPackage(packageName, package, version)`](https://docs.openzeppelin.com/upgrades/2.7/api#App-setPackage-string-contract-Package-uint64-3--)
- [`unsetPackage(packageName)`](https://docs.openzeppelin.com/upgrades/2.7/api#App-unsetPackage-string-)
- [`getImplementation(packageName, contractName)`](https://docs.openzeppelin.com/upgrades/2.7/api#App-getImplementation-string-string-)
- [`create(packageName, contractName, admin, data)`](https://docs.openzeppelin.com/upgrades/2.7/api#App-create-string-string-address-bytes-)

OPENZEPPELINUPGRADESOWNABLE

- [`owner()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-owner--)
- [`isOwner()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-isOwner--)
- [`renounceOwnership()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-renounceOwnership--)
- [`transferOwnership(newOwner)`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-transferOwnership-address-)
- [`_transferOwnership(newOwner)`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-_transferOwnership-address-)

EVENTS

- [`ProxyCreated(proxy)`](https://docs.openzeppelin.com/upgrades/2.7/api#App-ProxyCreated-address-)
- [`PackageChanged(providerName, package, version)`](https://docs.openzeppelin.com/upgrades/2.7/api#App-PackageChanged-string-address-uint64-3--)

OPENZEPPELINUPGRADESOWNABLE

- [`OwnershipTransferred(previousOwner, newOwner)`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-OwnershipTransferred-address-address-)

#### `constructor()`public

Constructor function.

#### `getProvider(string packageName) → contract ImplementationProvider provider`public

Returns the provider for a given package name, or zero if not set.

#### `getPackage(string packageName) → contract Package, [.var-type]#uint64[3]`[.item-kind]#public

Returns information on a package given its name.

#### `setPackage(string packageName, contract Package package, [.var-type]#uint64[3# version)]`public

Sets a package in a specific version as a dependency for this application. Requires the version to be present in the package.

#### `unsetPackage(string packageName)`public

Unsets a package given its name. Reverts if the package is not set in the application.

#### `getImplementation(string packageName, string contractName) → address`public

Returns the implementation address for a given contract name, provided by the `ImplementationProvider`.

#### `create(string packageName, string contractName, address admin, bytes data) → contract AdminUpgradeabilityProxy`public

Creates a new proxy for the given contract and forwards a function call to it. This is useful to initialize the proxied contract.

#### `ProxyCreated(address proxy)`event

Emitted when a new proxy is created.

#### `PackageChanged(string providerName, address package, [.var-type]#uint64[3# version)]`event

Emitted when a package dependency is changed in the application.

### `ImplementationDirectory`

Implementation provider that stores contract implementations in a mapping.

MODIFIERS

- [`whenNotFrozen()`](https://docs.openzeppelin.com/upgrades/2.7/api#ImplementationDirectory-whenNotFrozen--)

OPENZEPPELINUPGRADESOWNABLE

- [`onlyOwner()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-onlyOwner--)

FUNCTIONS

- [`freeze()`](https://docs.openzeppelin.com/upgrades/2.7/api#ImplementationDirectory-freeze--)
- [`getImplementation(contractName)`](https://docs.openzeppelin.com/upgrades/2.7/api#ImplementationDirectory-getImplementation-string-)
- [`setImplementation(contractName, implementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#ImplementationDirectory-setImplementation-string-address-)
- [`unsetImplementation(contractName)`](https://docs.openzeppelin.com/upgrades/2.7/api#ImplementationDirectory-unsetImplementation-string-)

OPENZEPPELINUPGRADESOWNABLE

- [`constructor()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-constructor--)
- [`owner()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-owner--)
- [`isOwner()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-isOwner--)
- [`renounceOwnership()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-renounceOwnership--)
- [`transferOwnership(newOwner)`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-transferOwnership-address-)
- [`_transferOwnership(newOwner)`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-_transferOwnership-address-)

EVENTS

- [`ImplementationChanged(contractName, implementation)`](https://docs.openzeppelin.com/upgrades/2.7/api#ImplementationDirectory-ImplementationChanged-string-address-)
- [`Frozen()`](https://docs.openzeppelin.com/upgrades/2.7/api#ImplementationDirectory-Frozen--)

OPENZEPPELINUPGRADESOWNABLE

- [`OwnershipTransferred(previousOwner, newOwner)`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-OwnershipTransferred-address-address-)

#### `whenNotFrozen()`modifier

Modifier that allows functions to be called only before the contract is frozen.

#### `freeze()`public

Makes the directory irreversibly immutable. It can only be called once, by the owner.

#### `getImplementation(string contractName) → address`public

Returns the implementation address of a contract.

#### `setImplementation(string contractName, address implementation)`public

Sets the address of the implementation of a contract in the directory.

#### `unsetImplementation(string contractName)`public

Removes the address of a contract implementation from the directory.

#### `ImplementationChanged(string contractName, address implementation)`event

Emitted when the implementation of a contract is changed.

#### `Frozen()`event

Emitted when the implementation directory is frozen.

### `ImplementationProvider`

Abstract contract for providing implementation addresses for other contracts by name.

FUNCTIONS

- [`getImplementation(contractName)`](https://docs.openzeppelin.com/upgrades/2.7/api#ImplementationProvider-getImplementation-string-)

#### `getImplementation(string contractName) → address`public

Abstract function to return the implementation address of a contract.

### `Package`

A package is composed by a set of versions, identified via semantic versioning, where each version has a contract address that refers to a reusable implementation, plus an optional content URI with metadata. Note that the semver identifier is restricted to major, minor, and patch, as prerelease tags are not supported.

MODIFIERS

OPENZEPPELINUPGRADESOWNABLE

- [`onlyOwner()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-onlyOwner--)

FUNCTIONS

- [`getVersion(semanticVersion)`](https://docs.openzeppelin.com/upgrades/2.7/api#Package-getVersion-uint64-3--)
- [`getContract(semanticVersion)`](https://docs.openzeppelin.com/upgrades/2.7/api#Package-getContract-uint64-3--)
- [`addVersion(semanticVersion, contractAddress, contentURI)`](https://docs.openzeppelin.com/upgrades/2.7/api#Package-addVersion-uint64-3—address-bytes-)
- [`hasVersion(semanticVersion)`](https://docs.openzeppelin.com/upgrades/2.7/api#Package-hasVersion-uint64-3--)
- [`getLatest()`](https://docs.openzeppelin.com/upgrades/2.7/api#Package-getLatest--)
- [`getLatestByMajor(major)`](https://docs.openzeppelin.com/upgrades/2.7/api#Package-getLatestByMajor-uint64-)
- [`semanticVersionHash(version)`](https://docs.openzeppelin.com/upgrades/2.7/api#Package-semanticVersionHash-uint64-3--)
- [`semanticVersionIsZero(version)`](https://docs.openzeppelin.com/upgrades/2.7/api#Package-semanticVersionIsZero-uint64-3--)

OPENZEPPELINUPGRADESOWNABLE

- [`constructor()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-constructor--)
- [`owner()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-owner--)
- [`isOwner()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-isOwner--)
- [`renounceOwnership()`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-renounceOwnership--)
- [`transferOwnership(newOwner)`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-transferOwnership-address-)
- [`_transferOwnership(newOwner)`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-_transferOwnership-address-)

EVENTS

- [`VersionAdded(semanticVersion, contractAddress, contentURI)`](https://docs.openzeppelin.com/upgrades/2.7/api#Package-VersionAdded-uint64-3—address-bytes-)

OPENZEPPELINUPGRADESOWNABLE

- [`OwnershipTransferred(previousOwner, newOwner)`](https://docs.openzeppelin.com/upgrades/2.7/api#OpenZeppelinUpgradesOwnable-OwnershipTransferred-address-address-)

#### `getVersion([.var-type]#uint64[3# semanticVersion) → address contractAddress, bytes contentURI]`public

Returns a version given its semver identifier.

#### `getContract([.var-type]#uint64[3# semanticVersion) → address contractAddress]`public

Returns a contract for a version given its semver identifier. This method is equivalent to `getVersion`, but returns only the contract address.

#### `addVersion([.var-type]#uint64[3# semanticVersion, address contractAddress, bytes contentURI)]`public

Adds a new version to the package. Only the Owner can add new versions. Reverts if the specified semver identifier already exists. Emits a `VersionAdded` event if successful.

#### `hasVersion([.var-type]#uint64[3# semanticVersion) → bool]`public

Checks whether a version is present in the package.

#### `getLatest() → [.var-type]#uint64[3# semanticVersion, address contractAddress, bytes contentURI]`public

Returns the version with the highest semver identifier registered in the package. For instance, if `1.2.0`, `1.3.0`, and `2.0.0` are present, will always return `2.0.0`, regardless of the order in which they were registered. Returns zero if no versions are registered.

#### `getLatestByMajor(uint64 major) → [.var-type]#uint64[3# semanticVersion, address contractAddress, bytes contentURI]`public

Returns the version with the highest semver identifier for the given major. For instance, if `1.2.0`, `1.3.0`, and `2.0.0` are present, will return `1.3.0` for major `1`, regardless of the order in which they were registered. Returns zero if no versions are registered for the specified major.

#### `semanticVersionHash([.var-type]#uint64[3# version) → bytes32]`internal

#### `semanticVersionIsZero([.var-type]#uint64[3# version) → bool]`internal

#### `VersionAdded([.var-type]#uint64[3# semanticVersion, address contractAddress, bytes contentURI)]`event

Emitted when a version is added to the package.

## Utility

### `Initializable`

Helper contract to support initializer functions. To use it, replace the constructor with a function that has the `initializer` modifier. WARNING: Unlike constructors, initializer functions must be manually invoked. This applies both to deploying an Initializable contract, as well as extending an Initializable contract via inheritance. WARNING: When used with inheritance, manual care must be taken to not invoke a parent initializer twice, or ensure that all initializers are idempotent, because this is not dealt with automatically as with constructors.

MODIFIERS

- [`initializer()`](https://docs.openzeppelin.com/upgrades/2.7/api#Initializable-initializer--)

#### `initializer()`modifier

Modifier to use in the initializer function of a contract.