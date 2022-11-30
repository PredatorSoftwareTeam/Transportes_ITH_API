import { config } from "dotenv";
config();

export const PORT = process.env.PORT;
export const DB_HOST = process.env.DB_HOST || "railway";
export const DB_USER = process.env.DB_USER || "containers-us-west-135.railway.app";
export const DB_PASSWORD = process.env.DB_PASSWORD || "KcOAGmRtZPWlnk8JYyqq";
export const DB_DATABASE = process.env.DB_DATABASE || "6981";
export const DB_PORT = process.env.DB_PORT || "root";
