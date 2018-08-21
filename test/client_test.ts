/* tslint:disable: no-unused-expression */
import {expect} from 'chai';
import {suite, test, timeout} from 'mocha-typescript';
import {Client, ClientError} from '../src';

/**
 * Tests the features of the `Client` class.
 */
@suite(timeout(15000))
class ClientTest {

  /**
   * Tests the `Client` constructor.
   */
  @test async testConstructor(): Promise<void> {
    // It should throw an error if the credentials are invalid.
    try {
      await new Client('', '').sendMessage('Hello World!');
      expect.fail('Error not thrown');
    }

    catch (err) {
      expect(err).to.be.an.instanceof(TypeError);
    }
  }

  /**
   * Tests the `Client#sendMessage()` method.
   */
  @test async testSendMessage(): Promise<void> {
    // It should not send invalid messages.
    try {
      await new Client('anonymous', 'secret').sendMessage('');
      expect.fail('Error not thrown');
    }

    catch (err) {
      expect(err).to.be.an.instanceof(TypeError);
    }

    // It should throw a `ClientError` if a network error occurred.
    try {
      await new Client('anonymous', 'secret', new URL('http://localhost')).sendMessage('Bonjour Cédric !');
      expect.fail('Error not thrown');
    }

    catch (err) {
      expect(err).to.be.an.instanceof(ClientError);
    }

    // It should send valid messages with valid credentials.
    const {FREEMOBILE_USERNAME: username, FREEMOBILE_PASSWORD: password} = process.env;
    if (username && password) try {
      await new Client(username, password).sendMessage('Bonjour Cédric !');
      expect(true).to.be.ok;
    }

    catch (err) {
      expect(err).to.be.an.instanceof(ClientError);
    }
  }
}
