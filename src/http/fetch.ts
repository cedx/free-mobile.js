import {Request, RequestInfo, RequestInit, Response} from 'node-fetch';

/**
 * A function for fetching HTTP resources.
 */
export type FetchFunction = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

/**
 * A factory function creating HTTP requests.
 */
export type RequestFactory = (input: RequestInfo, init?: RequestInit) => Request;

/**
 * Defines the shape of an HTTP client.
 */
export interface HttpClient {

  /**
   * The function to use for creating new requests.
   */
  createRequest: RequestFactory;

  /**
   * The function to use for fetching resources.
   */
  fetch: FetchFunction;
}
