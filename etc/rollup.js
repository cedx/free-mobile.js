import {resolve} from 'path';

export default {
  input: resolve(__dirname, '../lib/browser.js'),
  output: {
    file: resolve(__dirname, '../build/free-mobile.js'),
    format: 'iife',
    name: 'freeMobile'
  }
};
