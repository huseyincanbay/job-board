import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRoutes = Router();

userRoutes.post("/", UserController.createUserController);
userRoutes.get("/", UserController.getAllUsersController);
userRoutes.get("/id/:id", UserController.getUserByIdController);
userRoutes.get("/email/:email", UserController.getUserByEmailController);
userRoutes.put("/:id", UserController.updateUserController);
userRoutes.delete("/:id", UserController.deleteUserController);
