import {join} from 'path';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: join(__dirname, '../lib/browser.mjs'),
  output: {file: join(__dirname, '../build/free-mobile.js'), format: 'iife', name: 'freeMobile'},
  plugins: [resolve(), commonjs({
    namedExports: {'node_modules/eventemitter3/index.js': ['EventEmitter']}
  })]
};
