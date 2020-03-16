import { Request, Response } from 'node-fetch';
/** Represents the event parameter used for request events. */
export declare class RequestEvent {
    readonly request: Request;
    /**
     * Creates a new request event.
     * @param request The related HTTP request.
     */
    constructor(request: Request);
}
/** Represents the event parameter used for response events. */
export declare class ResponseEvent extends RequestEvent {
    readonly response: Response;
    /**
     * Creates a new response event.
     * @param response The related HTTP response.
     * @param request The request that triggered this response.
     */
    constructor(response: Response, request: Request);
}
