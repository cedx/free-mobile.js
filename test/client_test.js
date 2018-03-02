'use strict';

const {expect} = require('chai');
const {Client, ClientError} = require('../lib/index.js');

/**
 * @test {Client}
 */
describe('Client', function() {
  this.timeout(15000);

  /**
   * @test {Client#constructor}
   */
  describe('constructor', () => {
    it('should throw an error if the credentials are invalid', async () => {
      try {
        await new Client('', '').sendMessage('Hello World!');
        expect(true).to.not.be.ok;
      }

      catch (err) {
        expect(err).to.be.an.instanceof(TypeError);
      }
    });
  });

  /**
   * @test {Client#sendMessage}
   */
  describe('#sendMessage()', () => {
    it('should not send invalid messages', async () => {
      try {
        await new Client('anonymous', 'secret').sendMessage('');
        expect(true).to.not.be.ok;
      }

      catch (err) {
        expect(err).to.be.an.instanceof(TypeError);
      }
    });

    let {FREEMOBILE_USERNAME: username, FREEMOBILE_PASSWORD: password} = process.env;
    if (username && password) it('should send valid messages with valid credentials', async () => {
      try {
        await new Client(username, password).sendMessage('Bonjour Cédric !');
        expect(true).to.be.ok;
      }

      catch (err) {
        expect(err).to.be.an.instanceof(ClientError);
      }
    });
  });
});
