import { IRouter } from "express";

export abstract class BaseController {
  public abstract registerRoutes(app: IRouter): void;
}
