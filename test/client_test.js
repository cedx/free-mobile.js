'use strict';

import {expect} from 'chai';
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
    it('should return an `Observable` instead of the underlying `Subject`', () => {
      let stream = new Client().onRequest;
      expect(stream).to.be.instanceof(Observable);
      expect(stream).to.not.be.instanceof(Subject);
    });
  });

  /**
   * @test {Client#onResponse}
   */
  describe('#onResponse', () => {
    it('should return an `Observable` instead of the underlying `Subject`', () => {
      let stream = new Client().onResponse;
      expect(stream).to.be.instanceof(Observable);
      expect(stream).to.not.be.instanceof(Subject);
    });
  });

  /**
   * @test {Client#sendMessage}
   */
  describe('#sendMessage()', () => {
    it('should not send valid messages with invalid credentials', async () => {
      try {
        await new Client().sendMessage('Hello World!');
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

    if ('FREEMOBILE_USERNAME' in process.env && 'FREEMOBILE_PASSWORD' in process.env)
      it('should send valid messages with valid credentials', async () => {
        await new Client(process.env.FREEMOBILE_USERNAME, process.env.FREEMOBILE_PASSWORD).sendMessage('Bonjour Cédric !');
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
      expect(data.endPoint).to.equal(Client.DEFAULT_ENDPOINT);
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
      expect(client.indexOf('Client {')).to.equal(0);
    });

    it('should contain the instance properties', () => {
      expect(client).to.contain('"password":"secret"').and.contain('"username":"anonymous"');
    });
  });
});
