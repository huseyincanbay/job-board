import { Router } from "express";
import { ApplicationController } from "../controllers/ApplicationController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { UserRole } from "../entities/User";

const applicationRoutes = Router();

applicationRoutes.post(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.USER])],
  ApplicationController.createApplicationController
);
applicationRoutes.get(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN])],
  ApplicationController.getAllApplicationsController
);
applicationRoutes.get(
  "/user/:id",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.USER])],
  ApplicationController.getApplicationByUserController
);
applicationRoutes.get(
  "/job/:id",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.USER])],
  ApplicationController.getApplicationByJobController
);
applicationRoutes.get(
  "/:id",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.USER])],
  ApplicationController.getApplicationByIdController
);
applicationRoutes.put(
  "/:id",
  [checkJwt, checkRole([UserRole.ADMIN])],
  ApplicationController.updateApplicationController
);
applicationRoutes.delete(
  "/:id",
  [checkJwt, checkRole([UserRole.ADMIN])],
  ApplicationController.deleteApplicationController
);

export default applicationRoutes;
