import {strict as assert} from 'assert';
import {Client, ClientError} from '../lib/index.js';

/** Tests the features of the {@link Client} class. */
describe('Client', function() {
  this.timeout(15000);

  describe('constructor', () => {
    it('should throw an error if the credentials are invalid', () => {
      assert.throws(() => new Client('', ''), TypeError);
    });
  });

  describe('.sendMessage()', () => {
    it('should not send invalid messages', () => {
      assert.rejects(new Client('anonymous', 'secret').sendMessage(''), TypeError);
    });

    it('should reject if a network error occurred', () => {
      const endPoint = new URL('http://localhost/');
      assert.rejects(new Client('anonymous', 'secret', endPoint).sendMessage('Bonjour Cédric !'), ClientError);
    });

    it('should send valid messages with valid credentials', () => {
      const username = process.env.FREEMOBILE_USERNAME;
      const password = process.env.FREEMOBILE_PASSWORD;
      assert.doesNotReject(new Client(username, password).sendMessage('Bonjour Cédric, à partir de Node.js !'));
    });
  });
});
