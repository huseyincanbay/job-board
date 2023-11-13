import { Job } from "../entities/Job";
import { AppDataSource } from "../config/data-source";

export const jobRepository = AppDataSource.getRepository(Job);