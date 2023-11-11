import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";

export class UserController {
  static createUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData = req.body;
    try {
      const newUser = await UserService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Internal server error occured!" });
    }
  };

  static getAllUsersController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: "Users could not be found!",
      });
    }
  };

  static getUserByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const user = await UserService.getUserById(parseInt(id));
      if (user !== undefined) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({
        message: "User could not be found!",
      });
    }
  };
}
