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
    it('should initialize the existing properties', () => {
      let client = new Client({username: 'anonymous', password: 'secret'});
      assert.equal(client.password, 'secret');
      assert.equal(client.username, 'anonymous');
    });

    it('should not create new properties', () => {
      assert.ok(!('foo' in new Client({foo: 'bar'})));
    });
  });

  /**
   * @test {Client#sendMessage}
   */
  describe('#sendMessage()', () => {
    it('should not send valid messages with invalid credentials', done => {
      new Client().sendMessage('Hello World!').subscribe(
        () => done(new Error('The credentials are invalid.')),
        () => done()
      );
    });

    it('should not send invalid messages with valid credentials', done => {
      new Client({username: 'anonymous', password: 'secret'}).sendMessage('').subscribe(
        () => done(new Error('The message is empty.')),
        () => done()
      );
    });

    if ('FREEMOBILE_USERNAME' in process.env && 'FREEMOBILE_PASSWORD' in process.env)
      it('should send valid messages with valid credentials', done => {
        new Client({username: process.env.FREEMOBILE_USERNAME, password: process.env.FREEMOBILE_PASSWORD})
          .sendMessage('Bonjour Cédric !')
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
