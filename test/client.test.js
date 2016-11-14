import assert from 'assert';
import {Client} from '../src/index';

/**
 * @test {Client}
 */
describe('Client', function() {
  this.timeout(15000);

  /**
   * @test {Client#constructor}
   */
  describe('#constructor()', () => {
    it('should throw an error if arguments are invalid', () => {
      assert.throws(() => new Client('', ''));
    });
  });

  /**
   * @test {Client#sendMessage}
   */
  describe('#sendMessage()', () => {
    it('should disallow empty messages', done => {
      new Client('foo', 'bar').sendMessage('').subscribe(
        () => done(new Error('The message is empty.')),
        () => done()
      );
    });

    if ('FREEMOBILE_USERNAME' in process.env && 'FREEMOBILE_PASSWORD' in process.env)
      it('should send the messages with valid credentials', done => {
        new Client(process.env.FREEMOBILE_USERNAME, process.env.FREEMOBILE_PASSWORD)
          .sendMessage('Hello World!')
          .subscribe(null, done, done);
      });
  });

  /**
   * @test {Client#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return an object instance with the same public values', () => {
      let data = new Client({username: 'anonymous', password: 'secret'}).toJSON();
      assert.equal(data.constructor.name, 'Object');
      assert.equal(data.password, 'secret');
      assert.equal(data.username, 'anonymous');
    });
  });
});
