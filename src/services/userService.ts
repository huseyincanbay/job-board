import { User } from "../entities/User";
import { userRepository } from "../repositories/UserRepository";
import { Request, Response, NextFunction } from "express";

export class UserService {
  static createUser = async(data: User): Promise<User> => {
    const user = new User();
    user.username = data.username;
    user.email = data.email;
    user.password = data.password;
    // user.role = data.role; will be applied
    user.hashPassword();

    try {
      return await userRepository.save(user);
    } catch (error) {
      throw error;
    }
  };

  static getAllUsers = async(): Promise<User[]> => {
    try {
      return await userRepository.find();
    } catch (error) {
      throw error;
    }
  };

  static getUserById = async(id: number): Promise<User | undefined> => {
    try {
      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', {id})
        .getOne();
      return user as User | undefined;
    } catch (error) {
      throw error;
    }
  };
}