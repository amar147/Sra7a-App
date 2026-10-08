import {resolve} from "path";
import {config} from "dotenv";
export const NODE_ENV = process.env.NODE_ENV || "development";
config({ path: resolve( `.env.${NODE_ENV}`) });
export const PORT = parseInt(process.env.PORT ?? "3000");


export const DB_URI = process.env.DB_URI ?? "mongodb://localhost:27017";
export const DB_NAME = process.env.DB_NAME ?? "test";



export const ENC_KEY = Buffer.from(process.env.ENC_KEY, 'hex');
export const IV_LENGTH = Number(process.env.IV_LENGTH) || 16;


export const ACCESS_USER_TOKEN_SIGNTURE = process.env.ACCESS_USER_TOKEN_SIGNTURE ?? "SDFRE@fe_U";
export const ACCESS_ADMIN_TOKEN_SIGNTURE = process.env.ACCESS_ADMIN_TOKEN_SIGNTURE ?? "SDFRE@fe_A";



export const ACCESS_TOKEN_EXPIRES_IN = Number(process.env.ACCESS_TOKEN_EXPIRES_IN) ||1800;



export const REFRESH_USER_TOKEN_SIGNTURE = process.env.REFRESH_USER_TOKEN_SIGNTURE ?? "SDSERF£W_U";
export const REFRESH_ADMIN_TOKEN_SIGNTURE = process.env.REFRESH_ADMIN_TOKEN_SIGNTURE ?? "SDSERF£W_A";

export const REFRESH_TOKEN_EXPIRES_IN = Number(process.env.REFRESH_TOKEN_EXPIRES_IN) || 86400 * 365;


export const REDIS_URI = process.env.REDIS_URI ;


