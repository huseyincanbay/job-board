import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/database";
import { PORT } from "./config/config";

dotenv.config();

const app = express();

const start = async () => {
  // connect to db
  await connectDB();

  // Middleware
  app.use(bodyParser.json());
  app.use(cors());
  app.use(helmet());
  app.use(cookieParser());

  //trial route
  app.get('/', () => {
    console.log('Welcome Home!')
  });

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

start();
