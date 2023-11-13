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
    const id = parseInt(req.params.id, 10);
    try {
      const user = await UserService.getUserById(id);
      if (user !== undefined) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal server error occured!",
      });
    }
  };

  static getUserByEmailController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const email = req.params.email;
    try {
      const user = await UserService.getUserByEmail(email);
      if (user !== undefined) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Email not found!" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal server error occured!",
      });
    }
  };

  static updateUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = parseInt(req.params.id, 10);
    const userData = req.body;
    try {
      const updatedUser = await UserService.updateUser(id, userData);
      if (updatedUser !== undefined) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error occured!",
      });
    }
  };

  static deleteUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = parseInt(req.params.id, 10);
    try {
      const deletedUser = await UserService.deleteUser(id);
      if (deletedUser !== undefined) {
        res.status(200).json(deletedUser);
      } else {
        res.status(404).json({
          message: "User could not be deleted!",
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error occured!" });
    }
  };
}
