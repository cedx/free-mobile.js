const resolve = require('rollup-plugin-node-resolve');
module.exports = {
  input: 'lib/browser.mjs',
  output: {file: 'build/free-mobile.js', format: 'iife', name: 'freeMobile'},
  plugins: [resolve()]
};
