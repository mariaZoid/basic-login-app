import express, { IRouter } from "express";
import { z } from "zod";
import { computeHash } from "../helpers/computeHash";
import { UserSafeDto, UsersRepository } from "../models/Users";
import { BaseController } from "./BaseController";
import { errorHandler, UnauthorizedError } from "./errorHandler";
import { registerEndpoint } from "./RegisterEndpoint";
import jwt from 'jsonwebtoken';
import ms from "ms";


export class MainController extends BaseController {
  constructor() {
    super();
  }
  registerRoutes(app: IRouter): void {
    const router = express.Router();

    registerEndpoint(router, "/register", this.register, RegisterRequestSchema);
    registerEndpoint(router, "/login", this.login, LoginRequestSchema);

    app.use("/", router);
    app.use(errorHandler());
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
        // add account verification send - email ?
  };

  private login = async (data: LoginData) : Promise<any> => {
    const user = await UsersRepository.findOne({where: {email: data.email}});
    if (user === null || user.dataValues.passHash !== computeHash(data.password)) {
        throw new UnauthorizedError('Wrong credentials');
    }
    const userSafeDto = user.toSafeDto();
    
    const token = await this.generateJwt(userSafeDto);
    return { userSafeDto, token };
  }

  private generateJwt = async (userData: UserSafeDto) : Promise<any> => {
    const secretKey = process.env.JWT_SECRET!;

    const expiryTime: string = '1h'; // this can be placed in a config
    const now = new Date();
    const tokenExpiresAt = now.getTime() + ms(expiryTime);
    const token = jwt.sign(userData, secretKey, { expiresIn: expiryTime });

    return { token, tokenExpiresAt };
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
    password: z.string(), // add min 8 char
    email: z.string(), // add email validator schema
});