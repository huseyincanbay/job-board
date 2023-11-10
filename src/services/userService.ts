import { User } from "../entities/User";
import { userRepository } from "../repositories/UserRepository";

export class UserService {
  static createUser = async (data: User) => {
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
}