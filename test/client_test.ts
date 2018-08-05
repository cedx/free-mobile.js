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
        expect.fail('Error not thrown');
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
        expect.fail('Error not thrown');
      }

      catch (err) {
        expect(err).to.be.an.instanceof(TypeError);
      }
    });

    it('should throw a `ClientError` if a network error occurred', async () => {
      try {
        await new Client('anonymous', 'secret', 'http://localhost').sendMessage('Bonjour Cédric !');
        expect.fail('Error not thrown');
      }

      catch (err) {
        expect(err).to.be.an.instanceof(ClientError);
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
