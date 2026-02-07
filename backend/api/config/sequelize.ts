/**
 * @file sequelize.ts
 * @description Database configuration for EtherFantasy
 * 
 * Uses environment variables for all credentials.
 * NEVER hardcode database credentials in this file.
 * 
 * Required ENV vars:
 * - DB_NAME: Database name
 * - DB_USER: Database username
 * - DB_PASSWORD: Database password
 * - DB_HOST: Database host
 * - DB_PORT: Database port (default: 3306)
 */

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); 

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    logging: false,
  }
);
