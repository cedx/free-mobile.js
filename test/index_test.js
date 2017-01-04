'use strict';

import assert from 'assert';
import {sendMessage} from '../src/index';
import {Observable} from 'rxjs';

/**
 * @test {sendMessage}
 */
describe('sendMessage()', () => {
  it('should return an Observable', () => {
    assert.ok(sendMessage('', {}) instanceof Observable);
  });

  it('should not send valid messages with invalid credentials', done => {
    sendMessage('Hello World!', {}).subscribe(
      () => done(new Error('The credentials are invalid.')),
      () => done()
    );
  });

  it('should not send invalid messages with valid credentials', done => {
    sendMessage('', {password: 'secret', username: 'anonymous'}).subscribe(
      () => done(new Error('The message is empty.')),
      () => done()
    );
  });
});
