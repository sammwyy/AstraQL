# AstraQL

Fast and easy to use GraphQL Client.

## Install

```shell
# With npm:
npm install astraql

# With yarn:
yarn add astraql
```

## Usage

This library has both flow and ts declarations

### As a ES Module

```javascript
import __LIB__ from '__LIB__';

// for promise module and functions
const { sleep } = __LIB__.promise;

// If index module getting too big for the size you can import specific module
import promise from '__LIB__/dist/promise';

```

### As CJS Module

```javascript
// If uses require function you will need to use .default
// For import in typescript or flow, this is not required

const __LIB__ = require('__LIB__').default;
const promise = require('__LIB__/dist/promise').default;
```

## To run development following will be recommended

Use [VS Code](https://code.visualstudio.com/download) as IDE:

The library template is already setup with vscode settings for auto format.

Ensure the following plugins are enabled:

- [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (This is setup with airbnb linting convention)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Add JSDoc Comment](https://marketplace.visualstudio.com/items?itemName=stevencl.addDocComments#)

Optional but Recommended:

- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [Indenticator](https://marketplace.visualstudio.com/items?itemName=sirtori.indenticator)
- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=coenraads.bracket-pair-colorizer)
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your React app instead of your React library.
