## How to Create a Starter Kit

In this guide, you’ll learn how to create your own starter kit. Not sure what starter kits are? Check out [getting started](https://docs.openzeppelin.com/starter-kits/2.3/).

### Why Should I Create a Starter Kit?

It is still very hard for new developers to enter the Ethereum ecosystem compared to Web2. New developers suffer from a lack of comprehensive documentation and a huge upfront commitment. Starter kits represent a bridge between Web2 and Web3 supercharged to bootstrap developers into the Ethereum ecosystem within minutes, using familiar concepts and technologies, such as React, NPM, and Mocha, while introducing Web3 components like Infura, OpenZeppelin, Truffle, and Rimble. Creating a starter kit dedicated to a particular project or tool is a great way to spotlight it for new developers in the space as well as to create hands-on experience and materials to run workshops. [GSN Starter Kit](https://github.com/OpenZeppelin/starter-kit-gsn) is an example of a project focused starter kit which helped to kickstart [Gas Station Network](https://gsn.openzeppelin.com/).

### How to Create a Starter Kit

To create an OpenZeppelin Kit you’ll need to publish a GitHub repo containing your kit project. The GitHub repo has to contain a `kit.json` configuration file and have a stable branch. The repo should have a meaningful `README.md` file walking users through installation, running and building a kit. The `stable` branch will be used as a source for the kit’s deployment. Use the stable branch only for kit releases. [The tutorial kit](https://github.com/OpenZeppelin/starter-kit-tutorial) is a good example.

#### Checklist

- Create a GitHub repo
- Create a stable branch on the repo
- Add a valid configuration file to the root of the repo
- Add desired tools and packages to the repo
- Add meaningful README.md file to the repo
- Push a release version to a `stable` branch

#### Configuration file

Every Starter kit must include a `kit.json` configuration file. This file has the following structure:

```json
    {
      "manifestVersion": "0.1.0",
      "message": "More at https://github.com/OpenZeppelin/starter-kit",
      "files": [
        ".gitignore",
        "LICENSE",
        "client",
        "contracts",
        "migrations",
        "package.json",
        "solhint.json",
        "test",
        "truffle-config.js"
      ],
      "hooks": {
        "post-unpack": "npm install && cd client && npm install"
      }
    }
```

**manifestVersion**

A version of a manifest that ensures proper handling of a kit. Always use the version provided in the documentation. **Do not bump it to publish a new version of a kit.**

**Message**

A message displayed in the terminal immediately after installation. Keep it short and to the point.

**Files**

An array of files and folders to be copied from the repo. An empty array would result in copying all the files.

**Hooks**

An object containing terminal commands to execute during unpacking. Currently, only the `post-unpack` hook is supported, which is executed right after unpacking a kit.

### How to Test a Starter Kit

Once your starter kit is ready it is always a good idea to give it a test run. It is possible to install a starter kit from any Git branch using syntax `npx openzeppelin unpack 'yourGitHubHandle/yourRepoName#branch'`, for example `npx openzeppelin unpack 'OpenZeppelin/starter-kit#develop'`. Make sure your starter kit runs fine on Linux, Mac OS, and Windows. We have experienced installation and running issues depending on a platform.

### How to Release a New Version

Once you’ve added desired changes to your starter kit, push them to the `stable` branch and they will be instantly available using an `unpack` command.

### How to Install a Starter Kit

Running a command `npx openzeppelin unpack yourGitHubHandle/yourRepoName` will install a starter kit in the current directory, for example `npx openzeppelin unpack 'OpenZeppelin/starter-kit'`.

### Getting listed at OpenZeppelin website

We value community contribution and would love to list your Starter Kit on the OpenZeppelin website. Every submitted kit undergoes a screening process to ensure safety. To start the process send us an email with your desired kit name and description, along with a link to its GitHub repo. Once the kit is verified, the short name is assigned to it to simplify installation, like `openzeppelin unpack gsn`.