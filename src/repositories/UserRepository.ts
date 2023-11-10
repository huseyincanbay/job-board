import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';

export const userRepository = AppDataSource.getRepository(User);