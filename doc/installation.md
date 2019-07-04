# Installation

## Requirements
Before installing **Free Mobile for JS**, you need to make sure you have [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com), the Node.js package manager, up and running.

!!! warning
    Free Mobile for JS requires Node.js >= **12.6.0**.

You can verify if you're already good to go with the following commands:

```shell
node --version
# v12.6.0

npm --version
# 6.9.0
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
Now in your [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) code, you can use:

```js
import {Client, ClientError} from '@cedx/free-mobile';
```

### 3. Use it
See the [usage information](usage.md).

## Installing from a content delivery network
This library is also available as a ready-made bundle.
To install it, add this code snippet to the `<head>` of your HTML document:

```html
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@cedx/free-mobile/build/free-mobile.min.js"></script>

<!-- UNPKG -->
<script src="https://unpkg.com/@cedx/free-mobile/build/free-mobile.min.js"></script>
```

The classes of this library are exposed as `freeMobile` property on the `window` global object:

```html
<script>
  const {Client, ClientError} = window.freeMobile;
</script>
```
