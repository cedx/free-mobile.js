'use strict';

const {expect} = require('chai');
const {Observable, Subject} = require('rxjs');
const {Client} = require('../lib');

/**
 * @test {Client}
 */
describe('Client', function() {
  this.timeout(15000);

  /**
   * @test {Client#onRequest}
   */
  describe('#onRequest', () => {
    it('should return an `Observable` instead of the underlying `Subject`', () => {
      let stream = (new Client).onRequest;
      expect(stream).to.be.instanceof(Observable);
      expect(stream).to.not.be.instanceof(Subject);
    });
  });

  /**
   * @test {Client#onResponse}
   */
  describe('#onResponse', () => {
    it('should return an `Observable` instead of the underlying `Subject`', () => {
      let stream = (new Client).onResponse;
      expect(stream).to.be.instanceof(Observable);
      expect(stream).to.not.be.instanceof(Subject);
    });
  });

  /**
   * @test {Client#sendMessage}
   */
  describe('#sendMessage()', () => {
    it('should not send valid messages with invalid credentials', done => {
      (new Client).sendMessage('Hello World!').subscribe({
        complete: () => done(new Error('Error not thrown.')),
        error: () => done()
      });
    });

    it('should not send invalid messages with valid credentials', done => {
      new Client('anonymous', 'secret').sendMessage('').subscribe({
        complete: () => done(new Error('Error not thrown.')),
        error: () => done()
      });
    });

    let {FREEMOBILE_USERNAME: username, FREEMOBILE_PASSWORD: password} = process.env;
    if (username && password) it('should send valid messages with valid credentials', done => {
      new Client(username, password).sendMessage('Bonjour Cédric !').subscribe(null, done, done);
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
