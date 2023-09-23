import { Request, Response, IRouter, NextFunction } from "express";
import {z} from 'zod';

export const validateBody =
    <RequestBody>(validator: z.ZodType<RequestBody>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = validator.parse(req.body);
            next();
        } catch (err) {
            next(err);
        }
    };

export type ExpressMiddleware<RequestBody> = (
  request: Request<
    {
      [key: string]: string;
    },
    any,
    RequestBody
  >,
  response: Response,
  next: NextFunction
) => void;


export function registerEndpoint<RequestBody, ResponseBody>(
  router: IRouter,
  path: string,
  handler: (data: RequestBody) => Promise<ResponseBody>,
  validator: z.ZodType<RequestBody>
): void {
  router.all(path, validateBody(validator), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await handler(req.body);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  });
}