export declare class HttpError extends Error {
    readonly statusCode: number;
    readonly errorMessage: string;
    constructor(statusCode: number, errorMessage: string);
}

export declare class UserError extends HttpError {
    readonly statusCode: number;
    readonly errorMessage: string;
    constructor(statusCode: number, errorMessage: string);
}