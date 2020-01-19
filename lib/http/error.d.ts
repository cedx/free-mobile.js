/** An exception caused by an error in a [[NodeClient]] or [[BrowserClient]] request. */
export declare class ClientError extends Error {
    readonly uri?: URL | undefined;
    /**
     * Creates a new client error.
     * @param message A message describing the error.
     * @param uri The URL of the HTTP request or response that failed.
     */
    constructor(message?: string, uri?: URL | undefined);
}
