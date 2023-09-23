import express, { IRouter } from "express";
import { z } from "zod";
import { computeHash } from "../helpers/computeHash";
import { UsersRepository } from "../models/Users";
import { BaseController } from "./BaseController";
import { registerEndpoint } from "./RegisterEndpoint";


export class MainController extends BaseController {
  constructor() {
    super();
  }
  registerRoutes(app: IRouter): void {
    const router = express.Router();

    registerEndpoint(router, "/register", this.register, RegisterRequestSchema);
    registerEndpoint(router, "/login", this.login, LoginRequestSchema);
    app.use("/", router);
  }

  private register = async (data: RegisterData): Promise<void> => {
    const existingUser = await UsersRepository.findOne({where: {email: data.email}});

    if (existingUser !== null) {
        throw new Error('User already exists');
    }
    const now = new Date();
    UsersRepository.create(
            {
                email: data.email,
                passHash: computeHash(data.password),
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

  private login = async (data: LoginRequest) : Promise<void> => {
    
  }
}

// ********************************
// register
// ********************************
export type RegisterData = {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
};

export const RegisterRequestSchema: z.ZodType<RegisterData> = z.object({
    password: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
});

// ********************************
// login
// ********************************
export type LoginData = {
    password: string;
    email: string;
};

export const LoginRequestSchema: z.ZodType<LoginData> = z.object({
    password: z.string().min(8),
    email: z.string(), // add email validator schema
});