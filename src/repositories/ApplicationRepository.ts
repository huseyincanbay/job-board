import { Application } from "../entities/Application";
import { AppDataSource } from "../config/data-source";

export const applicationRepository = AppDataSource.getRepository(Application);

