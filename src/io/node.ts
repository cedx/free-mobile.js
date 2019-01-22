import fetch, {Request as NodeRequest} from 'node-fetch';
import {FetchClient} from '../http';

/**
 * The `fetch` client for Node.js.
 */
export const fetchClient: FetchClient = {
  fetch: fetch as any,
  newRequest(url: URL): Request {
    return new NodeRequest(url.href) as any;
  }
};
