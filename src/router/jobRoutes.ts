import { Router } from "express";
import { JobController } from "../controllers/JobController";

const jobRoutes = Router();

jobRoutes.post("/", JobController.createJobController);
jobRoutes.get("/", JobController.getAllJobsController);
jobRoutes.get("/:id", JobController.getJobByIdController);
jobRoutes.get("/:title", JobController.getJobByTitleController);
// jobRoutes.get("/:salary", JobController.getJobBySalaryController);
jobRoutes.post("/jobs/search", JobController.searchJobsController);
jobRoutes.put("/:id", JobController.updateJobController);
jobRoutes.delete("/:id", JobController.deleteJobController);
