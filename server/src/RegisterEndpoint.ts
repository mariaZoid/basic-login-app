import { Request, Response, IRouter, NextFunction } from "express";

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
export type Context = Record<string, any>;
export function registerEndpoint<RequestBody, ResponseBody>(
  router: IRouter,
  path: string,
  handler: (data: RequestBody) => Promise<ResponseBody>
): void {
  router.all(path, async (req: Request, res: Response, next: NextFunction) => {
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
