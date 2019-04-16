/** A function for fetching HTTP resources. */
export type FetchFunction = (request: Request) => Promise<Response>;

/** A factory function creating HTTP requests. */
export type RequestFactory = (url: URL) => Request;

/** Defines the shape of an HTTP client based on [`Fetch API`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). */
export interface FetchClient {

  /** Fetches resources. */
  fetch: FetchFunction;

  /** Creates new requests. */
  newRequest: RequestFactory;
}
