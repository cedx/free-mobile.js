/* tslint:disable: no-unused-expression */
import {expect} from 'chai';
import {Client, ClientError} from '../src';

/**
 * Tests the features of the `Client` class.
 */
describe('Client', function() {
  this.timeout(15000);
  const isBrowser = typeof window != 'undefined' && typeof window.document != 'undefined';

  /**
   * Tests the `Client` constructor.
   */
  describe('constructor', async () => {
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
   * Tests the `Client#sendMessage()` method.
   */
  describe('#sendMessage', async () => {
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
        await new Client('anonymous', 'secret', new URL('http://localhost/')).sendMessage('Bonjour Cédric !');
        expect.fail('Error not thrown');
      }

      catch (err) {
        expect(err).to.be.an.instanceof(ClientError);
      }
    });

    if (!isBrowser) it('should send valid messages with valid credentials', async () => {
      const {FREEMOBILE_USERNAME: username, FREEMOBILE_PASSWORD: password} = process.env;
      if (username && password) try {
        await new Client(username, password).sendMessage('Bonjour Cédric !');
        expect(true).to.be.ok;
      }

      catch (err) {
        expect(err).to.be.an.instanceof(ClientError);
      }
    });
  });
});
