import { Router } from "express";
import { JobController } from "../controllers/JobController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { UserRole } from "../entities/User";

const jobRoutes = Router();

jobRoutes.post(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.USER])],
  JobController.createJobController
);
jobRoutes.get(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.USER])],
  JobController.getAllJobsController
);
jobRoutes.get(
  "/:id",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.USER])],
  JobController.getJobByIdController
);
jobRoutes.get(
  "/:title",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.USER])],
  JobController.getJobByTitleController
);
// jobRoutes.get("/:salary", JobController.getJobBySalaryController);
jobRoutes.post(
  "/jobs/search",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.USER])],
  JobController.searchJobsController
);
jobRoutes.put(
  "/:id",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.USER])],
  JobController.updateJobController
);
jobRoutes.delete(
  "/:id",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.USER])],
  JobController.deleteJobController
);

export default jobRoutes;
