import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { UserRole } from "../entities/User";

const userRoutes = Router();

userRoutes.post(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.USER])],
  UserController.createUserController
);
userRoutes.get(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN])],
  UserController.getAllUsersController
);
userRoutes.get(
  "/id/:id",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.USER])],
  UserController.getUserByIdController
);
userRoutes.get(
  "/email/:email",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.USER])],
  UserController.getUserByEmailController
);
userRoutes.put(
  "/:id",
  [checkJwt, checkRole([UserRole.ADMIN])],
  UserController.updateUserController
);
userRoutes.delete(
  "/:id",
  [checkJwt, checkRole([UserRole.ADMIN])],
  UserController.deleteUserController
);

export default userRoutes;
