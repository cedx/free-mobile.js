'use strict';

const {expect} = require('chai');
const {Client, ClientError} = require('../lib/index.js');

/**
 * @test {Client}
 */
describe('Client', function() {
  this.timeout(15000);

  /**
   * @test {Client#sendMessage}
   */
  describe('#sendMessage()', () => {
    it('should not send valid messages with invalid credentials', async () => {
      try {
        await new Client('', '').sendMessage('Hello World!');
        expect(true).to.not.be.ok;
      }

      catch (err) {
        expect(err).to.be.an.instanceof(ClientError);
      }
    });

    it('should not send invalid messages with valid credentials', async () => {
      try {
        await new Client('anonymous', 'secret').sendMessage('');
        expect(true).to.not.be.ok;
      }

      catch (err) {
        expect(err).to.be.an.instanceof(ClientError);
      }
    });

    let {FREEMOBILE_USERNAME: username, FREEMOBILE_PASSWORD: password} = process.env;
    if (username && password) it('should send valid messages with valid credentials', async () => {
      await new Client(username, password).sendMessage('Bonjour Cédric !');
      expect(true).to.be.ok;
    });
  });
});
