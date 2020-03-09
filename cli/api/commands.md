## openzeppelin|oz

Usage: `openzeppelin|oz  [options]`

where <command> is one of: accounts, add, balance, bump, call, check, compile, create, create2, freeze, init, link, publish, push, remove, send-tx, session, set-admin, transfer, unlink, unpack, upgrade, verify

- `--version`

  output the version number

- `-v, --verbose`

  verbose mode on: output errors stacktrace and detailed log.

- `-s, --silent`

  silent mode: no output sent to stderr.

## accounts

Usage: `accounts [options]`

list the accounts of the selected network

- `-n, --network `

  network to be used

- `-f, --from `

  specify transaction sender address

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

- `--no-interactive`

  force to run the command in non-interactive mode

## add

Usage: `add [contractName1[:contractAlias1] … contractNameN[:contractAliasN]] [options]`

add contract to your project. Provide a list of whitespace-separated contract names

- `--all`

  add all contracts in your build directory

- `--push [network]`

  push all changes to the specified network

- `-f, --from `

  specify the transaction sender address for --push

- `--skip-compile`

  skips contract compilation

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

- `--no-interactive`

  force to run the command in non-interactive mode

## balance

Usage: `balance --network  [options]`

query the balance of the specified account

- `--erc20 `

  query the balance of an ERC20 token instead of ETH

- `-n, --network `

  network to be used

- `-f, --from `

  specify transaction sender address

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

- `--no-interactive`

  force to run the command in non-interactive mode

## bump

Usage: `bump  [options]`

bump your project to a new <version>

- `--push [network]`

  push all changes to the specified network

- `-f, --from `

  specify the transaction sender address for --push

- `--skip-compile`

  skips contract compilation

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

## call

Usage: `call --to  --method  [options]`

call a method of the specified contract instance. Provide the [address], method to call and its arguments if needed

- `--to `

  address of the contract that will receive the call

- `--method `

  name of the method to execute in the contract

- `--args `

  arguments to the method to execute

- `-n, --network `

  network to be used

- `-f, --from `

  specify transaction sender address

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

- `--no-interactive`

  force to run the command in non-interactive mode

## check

Usage: `check [contract] [options]`

checks your contracts for potential issues

- `--skip-compile`

  skips contract compilation

## compile

Usage: `compile [options]`

compiles all contracts in the current project

- `--solc-version [version]`

  version of the solc compiler to use (value is written to configuration file for future runs, defaults to most recent release that satisfies contract pragmas)

- `--optimizer [on|off]`

  enables compiler optimizer (value is written to configuration file for future runs, defaults to off)

- `--optimizer-runs [runs]`

  specify number of runs if optimizer enabled (value is written to configuration file for future runs, defaults to 200)

- `--evm-version [evm]`

  choose target evm version (value is written to configuration file for future runs, defaults depends on compiler: byzantium prior to 0.5.5, petersburg from 0.5.5)

- `--typechain [web3-v1|truffle|ethers]`

  enables typechain generation of typescript wrappers for contracts using the chosen target

- `--typechain-outdir [path]`

  path where typechain artifacts are written (defaults to ./types/contracts/)

- `--no-interactive`

  force to run the command in non-interactive mode

## create

Usage: `create [alias] --network  [options]`

deploys a new upgradeable contract instance. Provide the <alias> you added your contract with, or <package>/<alias> to create a contract from a linked package.

- `--init [function]`

  call function after creating contract. If none is given, 'initialize' will be used

- `--args `

  provide initialization arguments for your contract if required

- `--force`

  ignore contracts validation errors

- `--minimal`

  creates a cheaper but non-upgradeable instance instead, using a minimal proxy

- `-n, --network `

  network to be used

- `-f, --from `

  specify transaction sender address

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

- `--skip-compile`

  skips contract compilation

- `--no-interactive`

  force to run the command in non-interactive mode

## create2

Usage: `create2 [alias] --network  --salt  [options]`

deploys a new upgradeable contract instance using CREATE2 at a predetermined address given a numeric <salt> and a <from> address. Provide the <alias> you added your contract with, or <package>/<alias> to create a contract from a linked package. A <signature> can be provided to derive the deployment address from a signer different to the <from> address. Warning: support for this feature is experimental.

- `--salt `

  salt used to determine the deployment address (required)

- `--query [sender]`

  do not create the contract and just return the deployment address, optionally specifying the sender used to derive the deployment address (defaults to 'from')

- `--init [function]`

  initialization function to call after creating contract (defaults to 'initialize', skips initialization if not set)

- `--args `

  arguments to the initialization function

- `--admin `

  admin of the proxy (uses the project’s proxy admin if not set)

- `--signature `

  signature of the request, uses the signer to derive the deployment address (uses the sender to derive deployment address if not set)

- `--force`

  force creation even if contracts have local modifications

- `-n, --network `

  network to be used

- `-f, --from `

  specify transaction sender address

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

## freeze

Usage: `freeze --network  [options]`

freeze current release version of your published project

- `-n, --network `

  network to be used

- `-f, --from `

  specify transaction sender address

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

## init

Usage: `init  [version]`

initialize your OpenZeppelin project. Provide a <project-name> and optionally an initial [version] name

- `--publish`

  automatically publish your project upon pushing it to a network

- `--force`

  overwrite existing project if there is one

- `--typechain `

  enable typechain support with specified target (web3-v1, ethers, or truffle)

- `--typechain-outdir `

  set output directory for typechain compilation (defaults to types/contracts)

- `--link `

  link to a dependency

- `--no-install`

  skip installing packages dependencies locally

- `--push [network]`

  push all changes to the specified network

- `-f, --from `

  specify the transaction sender address for --push

- `--skip-compile`

  skips contract compilation

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

- `--no-interactive`

  force to run the command in non-interactive mode

## link

Usage: `link [dependencyName1 … dependencyNameN] [options]`

links project with a list of dependencies each located in its npm package

- `--no-install`

  skip installing packages dependencies locally

- `--push [network]`

  push all changes to the specified network

- `-f, --from `

  specify the transaction sender address for --push

- `--skip-compile`

  skips contract compilation

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

- `--no-interactive`

  force to run the command in non-interactive mode

## publish

Usage: `publish --network  [options]`

publishes your project to the selected network

- `-n, --network `

  network to be used

- `-f, --from `

  specify transaction sender address

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

- `--no-interactive`

  force to run the command in non-interactive mode

## push

Usage: `push --network  [options]`

deploys your project to the specified <network>

- `--skip-compile`

  skips contract compilation

- `-d, --deploy-dependencies`

  deploys dependencies to the network if there is no existing deployment

- `--reset`

  redeploys all contracts (not only the ones that changed)

- `--force`

  ignores validation errors and deploys contracts

- `--deploy-proxy-admin`

  eagerly deploys the project’s proxy admin (if not deployed yet on the provided network)

- `--deploy-proxy-factory`

  eagerly deploys the project’s proxy factory (if not deployed yet on the provided network)

- `-n, --network `

  network to be used

- `-f, --from `

  specify transaction sender address

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

- `--no-interactive`

  force to run the command in non-interactive mode

## remove

Usage: `remove [contract1 … contractN] [options]`

removes one or more contracts from your project. Provide a list of whitespace-separated contract names.

- `--push [network]`

  push all changes to the specified network

- `-f, --from `

  specify the transaction sender address for --push

- `--skip-compile`

  skips contract compilation

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

- `--no-interactive`

  force to run the command in non-interactive mode

## send-tx

Usage: `send-tx --to  --method  [options]`

send a transaction to the specified contract instance. Provide the [address], method to call and its arguments if needed

- `--to `

  address of the contract that will receive the transaction

- `--method `

  name of the method to execute in the contract

- `--args `

  arguments to the method to execute

- `--value `

  optional value in wei to send with the transaction

- `--gas `

  gas limit of the transaction, will default to the limit specified in the configuration file, or use gas estimation if not set

- `-n, --network `

  network to be used

- `-f, --from `

  specify transaction sender address

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

- `--no-interactive`

  force to run the command in non-interactive mode

## session

Usage: `session [options]`

by providing network options, commands like create, freeze, push, and update will use them unless overridden. Use --close to undo.

- `--expires `

  expiration of the session in seconds (defaults to 900, 15 minutes)

- `--close`

  closes the current session, removing all network options set

- `-n, --network `

  network to be used

- `-f, --from `

  specify transaction sender address

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

- `--no-interactive`

  force to run the command in non-interactive mode

## set-admin

Usage: `set-admin [alias-or-address] [new-admin-address] --network  [options]`

change upgradeability admin of a contract instance, all instances or proxy admin. Provide the [alias] or [package]/[alias] of the contract to change the ownership of all its instances, or its [address] to change a single one, or none to change all contract instances to a new admin. Note that if you transfer to an incorrect address, you may irreversibly lose control over upgrading your contract.

- `--force`

  bypass a manual check

- `-n, --network `

  network to be used

- `-f, --from `

  specify transaction sender address

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

- `--no-interactive`

  force to run the command in non-interactive mode

## transfer

Usage: `transfer --network  [options]`

send funds to a given address

- `--to `

  specify recipient address

- `--value `

  the amount of ether units to be transferred

- `--unit `

  unit name. Wei, kwei, gwei, milli and ether are supported among others. If none is given, 'ether' will be used.

- `-n, --network `

  network to be used

- `-f, --from `

  specify transaction sender address

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

- `--no-interactive`

  force to run the command in non-interactive mode

## unlink

Usage: `unlink [dependencyName1… dependencyNameN]`

unlinks dependencies from the project. Provide a list of whitespace-separated dependency names

- `--push [network]`

  push all changes to the specified network

- `-f, --from `

  specify the transaction sender address for --push

- `--skip-compile`

  skips contract compilation

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

- `--no-interactive`

  force to run the command in non-interactive mode

## unpack

Usage: `unpack [kit]`

download and install an OpenZeppelin Starter Kit to the current directory

- `--no-interactive`

  force to run the command in non-interactive mode

## upgrade

Usage: `upgrade [alias-or-address] --network  [options]`

upgrade contract to a new logic. Provide the [alias] or [package]/[alias] you added your contract with, its [address], or use --all flag to upgrade all contracts in your project.

- `--init [function]`

  call function after upgrading contract. If no name is given, 'initialize' will be used

- `--args `

  provide initialization arguments for your contract if required

- `--all`

  upgrade all contracts in the application

- `--force`

  ignore contracts validation errors

- `-n, --network `

  network to be used

- `-f, --from `

  specify transaction sender address

- `--timeout `

  timeout in seconds for each transaction when using an http connection (defaults to 750 seconds)

- `--blockTimeout `

  timeout in blocks for each transaction when using a websocket connection (defaults to 50 blocks)

- `--skip-compile`

  skips contract compilation

- `--no-interactive`

  force to run the command in non-interactive mode

## verify

Usage: `verify [options] [contract-alias]`

verify a contract with etherscan or etherchain. Provide a contract name.

- `-n, --network [network]`

  network where to verify the contract

- `-o, --optimizer`

  enables optimizer option

- `--optimizer-runs [runs]`

  specify number of runs if optimizer enabled.

- `--remote `

  specify remote endpoint to use for verification

- `--api-key `

  specify etherscan API key. To get one, go to: https://etherscan.io/myapikey

- `--no-interactive`

  force to run the command in non-interactive mode



