import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";

const authRoutes = Router();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/register", AuthController.register);
authRoutes.post("/change-password", [checkJwt], AuthController.changePassword);

export default authRoutes;
