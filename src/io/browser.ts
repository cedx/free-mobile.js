import {FetchClient} from '../http';

/**
 * The `fetch` client for browsers.
 */
export const fetchClient: FetchClient = {
  fetch,
  newRequest(url: URL): Request {
    return new Request(url.href);
  }
};
