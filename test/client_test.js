'use strict';

const {expect} = require('chai');
const {Client} = require('../lib');

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
        await (new Client).sendMessage('Hello World!');
        expect(true).to.not.be.ok;
      }

      catch (err) {
        expect(true).to.be.ok;
      }
    });

    it('should not send invalid messages with valid credentials', async () => {
      try {
        await new Client('anonymous', 'secret').sendMessage('');
        expect(true).to.not.be.ok;
      }

      catch (err) {
        expect(true).to.be.ok;
      }
    });

    let {FREEMOBILE_USERNAME: username, FREEMOBILE_PASSWORD: password} = process.env;
    if (username && password) it('should send valid messages with valid credentials', async () => {
      await new Client(username, password).sendMessage('Bonjour Cédric !');
      expect(true).to.be.ok;
    });
  });

  /**
   * @test {Client#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with the same public values', () => {
      let data = new Client('anonymous', 'secret').toJSON();
      expect(Object.keys(data)).to.have.lengthOf(3);
      expect(data.endPoint).to.equal(Client.DEFAULT_ENDPOINT.href);
      expect(data.password).to.equal('secret');
      expect(data.username).to.equal('anonymous');
    });
  });

  /**
   * @test {Client#toString}
   */
  describe('#toString()', () => {
    let client = String(new Client('anonymous', 'secret'));

    it('should start with the class name', () => {
      expect(client.startsWith('Client {')).to.be.true;
    });

    it('should contain the instance properties', () => {
      expect(client).to.contain('"password":"secret"').and.contain('"username":"anonymous"');
    });
  });
});
