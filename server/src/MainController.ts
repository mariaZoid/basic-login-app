import express, { IRouter } from "express";
import { User, UsersRepository } from "../models/Users";
import { BaseController } from "./BaseController";
import { registerEndpoint } from "./RegisterEndpoint";
import { RegisterData} from "./types/RegisterData";


export class MainController extends BaseController {
  constructor() {
    super();
  }
  registerRoutes(app: IRouter): void {
    const router = express.Router();

    registerEndpoint(router, "/register", this.register);
    app.use("/", router);
  }

  private register = async (data: RegisterData): Promise<void> => {
    const now = new Date();
    UsersRepository.create(
            {
                email: data.email,
                passHash: data.password, // TODO: add hashing function
                firstName: data.password,
                lastName: data.password,
                createdAt: now,
                updatedAt: now,
            },
            {
                returning: true,
                raw: true,
            }
        );
  };
}
