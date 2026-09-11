import {resolve} from "path";
import {config} from "dotenv";
export const NODE_ENV = process.env.NODE_ENV || "development";
config({ path: resolve( `.env.${NODE_ENV}`) });
export const PORT = parseInt(process.env.PORT ?? "3000");
export const DB_URI = process.env.DB_URI ?? "mongodb://localhost:27017";
export const DB_NAME = process.env.DB_NAME ?? "test";
export const ENC_KEY = Buffer.from(process.env.ENC_KEY, 'hex');
export const IV_LENGTH = Number(process.env.IV_LENGTH) || 16;
