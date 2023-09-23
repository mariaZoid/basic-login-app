import express, { IRouter } from "express";
import { computeHash } from "../helpers/computeHash";
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
    registerEndpoint(router, "/login", this.register);
    app.use("/", router);
  }

  private register = async (data: RegisterData): Promise<void> => {
    const existingUser = await User.findOne({where: {email: data.email}});

    if (existingUser !== null) {
        throw new Error('User already exists');
    }
    const now = new Date();
    UsersRepository.create(
            {
                email: data.email,
                passHash: computeHash(data.password), // TODO: add hashing function
                firstName: data.firstName,
                lastName: data.lastName,
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
