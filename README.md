# Cotowali - Vscode extension

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](./LICENSE)

- [Cotowali](https://github.com/cotowali/cotowali) support for [Visual Studio Code](https://code.visualstudio.com) that provide syntax highlighting and indentation.

- [Original repository project](https://github.com/cotowali/vscode-cotowali).

## Description

I have documented the build extension process, the generate .vsix file method and how to install this extension file from the command line. It includes how to build the extension, and generate the .vsix file.

## Build the dependencies

### Dependencies

- Dependencies list
    1. [x] [NodeJS-LTS](https://nodejs.org/en/download/).

- Installing the dependencies

```bash
#Update Node Package Manager (NPM) version
npm -g install npm@latest

#Install Typescript language support
npm -g install typescript

#Install Husky to improve the commits
npm -g install husky

#Install Vscode extension manager command line tool
npm -g install vsce
```

### Compilation

- Generate the `.vsix` file

```bash
#Clone the repository
git clone https://github.com/cotowali/vscode-cotowali.git

#Get inside the project directory folder
cd ./vscode-cotowali

#Install the project developer dependencies
npm install --only=dev

#Install the project dependencies
npm install

#Build the project
npm run build

#Generate the `.vsix` file
vsce package
```

- Try this section **only** in case of troubleshoot

```bash
#Install the project dependencies without creating symlinks to binaries files
npm install --no-bin-links

#Clear the NPM cache
npm cache clear

#Install the project dependencies forcing to be without creating symlinks to binaries files
npm install --force --no-bin-links
```

### Installation

- Install the extension file from terminal

```bash
#List all installed extensions
code --list-extensions

#Install the extension
code --install-extension ./cotowali-0.0.1.vsix

#Uninstall the extension
code --uninstall-extension cotowali-0.0.1.vsix
```
