import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import config from "../config/config";
import { validateEmail } from "../helpers/validations";

export class AuthController {
  static login = async (req: Request, res: Response) => {

    let { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ message: "There are missing fields!" });
    } else {
      if (!validateEmail(email)) {
        return res.status(400).json({
          message: "Invalid email format!",
        });
      }
    }

    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneOrFail({ where: { email } });

      if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        return res.status(401).json({ message: "Password is not valid!" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        config.jwtSecret,
        { expiresIn: "1h" }
      );

      return res.status(200).json(token);
    } catch (error) {
      return res.status(401).json({ message: "Authentication Error!" });
    }
  };

  static changePassword = async (req: Request, res: Response) => {

    const id = res.locals.jwtPayload.userId;

    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      return res.status(400).json({ message: "There are missing fields!" });
    }

    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneOrFail(id);

      if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
        return res.status(401).json({ message: "Old password is invalid!" });
      }

      user.password = newPassword;
      const errors = await validate(user);
      if (errors.length > 0) {
        return res.status(400).json(errors);
      }
      
      user.hashPassword();
      await userRepository.save(user);

      return res.status(204).json({
        message:
          "The server has successfully fulfilled the request and that there is no additional content to send in the response payload body.",
      });
    } catch (error) {
      return res.status(401).json({ message: "Authentication Error!" });
    }
  };
}
