import { Request, Response, NextFunction } from "express";
import { ApplicationService } from "../services/applicationService";

export class ApplicationController {
  static createApplicationController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, jobId, status } = req.body;

    try {
      const newApplication = await ApplicationService.createApplication(
        userId,
        jobId,
        status
      );
      res.status(201).json(newApplication);
    } catch (error) {
      res.status(500).json({ message: "Application could not created!" });
    }
  };
}
