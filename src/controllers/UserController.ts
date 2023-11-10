import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';

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
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

