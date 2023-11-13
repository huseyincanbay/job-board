import { Router } from 'express';
import { JobController } from '../controllers/JobController';

const jobRoutes = Router();

jobRoutes.post("/", JobController.createJobController);
jobRoutes.get("/:id", JobController.getJobByIdController);
jobRoutes.get("/:title", JobController.getJobByTitleController);