import chai from 'chai';
import {Client, ClientError} from '../lib/index.js';
import {password, username} from './config.g.js';

/** Tests the features of the {@link Client} class. */
describe('Client', function() {
  const {expect} = chai;
  this.timeout(15000); // eslint-disable-line no-invalid-this

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
        await new Client('anonymous', 'secret', new URL('http://localhost/')).sendMessage('Bonjour Cédric !');
        expect.fail('Error not thrown');
      }

      catch (err) {
        expect(err).to.be.an.instanceof(ClientError);
      }
    });

    it('should send valid messages with valid credentials', async () => {
      try {
        const isBrowser = typeof window != 'undefined' && typeof window.document != 'undefined';
        await new Client(username, password).sendMessage(`Bonjour Cédric, à partir ${isBrowser ? 'd\'un navigateur' : 'de Node.js'} !`);
        expect(true).to.be.ok;
      }

      catch (err) {
        expect(err).to.be.an.instanceof(ClientError);
      }
    });
  });
});
