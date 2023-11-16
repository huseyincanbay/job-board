import { Router } from "express";
import { ApplicationController } from "../controllers/ApplicationController";

const applicationRoutes = Router();

applicationRoutes.post("/", ApplicationController.createApplicationController);
applicationRoutes.get("/", ApplicationController.getAllApplicationsController);
applicationRoutes.get("/:id", ApplicationController.getApplicationByIdController);
applicationRoutes.put("/:id", ApplicationController.updateApplicationController);
applicationRoutes.delete("/:id", ApplicationController.deleteApplicationController);
