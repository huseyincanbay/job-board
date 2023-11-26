import { Request, Response, NextFunction } from "express";
import { User, UserRole } from "../entities/User";
import { AppDataSource } from "../config/data-source";

export const checkRole = (roles: Array<UserRole>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.userId;

    const userRepository = AppDataSource.getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).json({ message: "Unauthorized!" });
    }

    if (roles.indexOf(user!.role) > -1) next();
    else res.status(401).json({ message: "Unauthorized!" });
  };
};
