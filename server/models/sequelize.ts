import { Sequelize } from "sequelize";
require("dotenv").config();

export const sequelize = new Sequelize(
  process.env.DB!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: "localhost",
    dialect: "postgres",
  }
);
