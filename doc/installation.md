# Installation

## Requirements
Before installing **Free Mobile for JS**, you need to make sure you have [Node.js](https://nodejs.org)
and [npm](https://www.npmjs.com), the Node.js package manager, up and running.

!!! warning
    Free Mobile for JS requires Node.js >= **10.12.0**.

You can verify if you're already good to go with the following commands:

```shell
node --version
# v10.12.0

npm --version
# 6.4.1
```

!!! info
    If you plan to play with the package sources, you will also need
    [Gulp](https://gulpjs.com) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material).

## Installing with npm package manager

### 1. Install it
From a command prompt, run:

```shell
npm install @cedx/free-mobile
```

### 2. Import it
Now in your [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) or [TypeScript](https://www.typescriptlang.org) code, you can use:

```ts
import {Client, ClientError} from '@cedx/free-mobile';
```
