import { Request, Response, NextFunction } from 'express';

export class HttpError extends Error {
    readonly statusCode: number;
    readonly errorMessage: string;
  
    constructor(statusCode: number, errorMessage: string) {
      super(errorMessage);
      this.name = 'HttpError';
      this.statusCode = statusCode;
      this.errorMessage = errorMessage;
    }
  }

export class UnauthorizedError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'UnauthorizedError';
    }
  }

export type ErrorResponseBody = {
  success: false;
  error: {
    message: string;
    referenceCode?: string;
    issues?: Object[];
  };
};

export function buildErrorResponse(
  message: string,
  issues?: Object[]
): ErrorResponseBody {
  return {
    success: false,
    error: {
      message,
      issues,
    },
  };
}

export function errorHandler() {
  return (error: any, req: Request, res: Response, next: NextFunction): void => {
    console.error(error);

    res.status(500).json(
      buildErrorResponse('Internal Server Error', [
        error.message,
      ])
    );
  };
}
