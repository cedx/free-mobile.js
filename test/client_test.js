'use strict';

import assert from 'assert';
import {Client} from '../src/index';
import {Observable, Subject} from 'rxjs';

/**
 * @test {Client}
 */
describe('Client', function() {
  this.timeout(15000);

  /**
   * @test {Client#onRequest}
   */
  describe('#onRequest', () => {
    it('should return an Observable instead of the underlying Subject', () => {
      let stream = new Client().onRequest;
      assert.ok(stream instanceof Observable);
      assert.ok(!(stream instanceof Subject));
    });
  });

  /**
   * @test {Client#onResponse}
   */
  describe('#onResponse', () => {
    it('should return an Observable instead of the underlying Subject', () => {
      let stream = new Client().onResponse;
      assert.ok(stream instanceof Observable);
      assert.ok(!(stream instanceof Subject));
    });
  });

  /**
   * @test {Client#sendMessage}
   */
  describe('#sendMessage()', () => {
    it('should return a `Promise`', () => {
      assert.ok(new Client().sendMessage('') instanceof Promise);
    });

    it('should not send valid messages with invalid credentials', done => {
      new Client().sendMessage('Hello World!').then(
        () => done(new Error('The credentials are invalid.')),
        () => done()
      );
    });

    it('should not send invalid messages with valid credentials', done => {
      new Client({password: 'secret', username: 'anonymous'}).sendMessage('').then(
        () => done(new Error('The message is empty.')),
        () => done()
      );
    });

    if ('FREEMOBILE_USERNAME' in process.env && 'FREEMOBILE_PASSWORD' in process.env)
      it('should send valid messages with valid credentials', done => {
        new Client({password: process.env.FREEMOBILE_PASSWORD, username: process.env.FREEMOBILE_USERNAME})
          .sendMessage('Bonjour Cédric !')
          .then(null, done, done);
      });
  });

  /**
   * @test {Client#toJSON}
   */
  describe('#toJSON()', () => {
    it('should return a map with the same public values', () => {
      let data = new Client({password: 'secret', username: 'anonymous'}).toJSON();
      assert.equal(data.constructor.name, 'Object');
      assert.equal(Object.keys(data).length, 2);
      assert.equal(data.password, 'secret');
      assert.equal(data.username, 'anonymous');
    });
  });

  /**
   * @test {Client#toString}
   */
  describe('#toString()', () => {
    let client = String(new Client({password: 'secret', username: 'anonymous'}));

    it('should start with the class name', () => {
      assert.equal(client.indexOf('Client {'), 0);
    });

    it('should contain the instance properties', () => {
      assert.ok(client.indexOf('"endPoint":"secret"') > 0);
      assert.ok(client.indexOf('"password":"secret"') > 0);
      assert.ok(client.indexOf('"username":"anonymous"') > 0);
    });
  });
});
