import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const DB_HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.PORT || 3000;

export const postgresql = {
    host: "localhost",
    port: "5432",
    username: "postgres",
    password: "123",
    name: "job-board"
}

const SERVER = {
    hostname: DB_HOST,
    port: PORT
};

const config = {
    server: SERVER,
    jwtSecret: JWT_SECRET
};

export default config;