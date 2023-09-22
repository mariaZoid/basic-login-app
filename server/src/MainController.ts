import express, { IRouter } from "express";
import { BaseController } from "./BaseController";
import { registerEndpoint } from "./RegisterEndpoint";


export class MainController extends BaseController {
  constructor() {
    super();
  }
  registerRoutes(app: IRouter): void {
    const router = express.Router();

    registerEndpoint(router, "/cats", this.login);
    app.use("/", router);
  }

  private login = async (data: any): Promise<any> => {
    console.log("cats are awesome");
  };

}