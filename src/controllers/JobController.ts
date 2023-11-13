import { Request, Response, NextFunction } from "express";
import { JobService } from "../services/jobService";

export class JobController {
  static createJobController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData = req.body;
    try {
      const newJob = await JobService.createJob(req, userData);
      res.status(201).json(newJob);
    } catch (error) {
      res.status(500).json({ message: "Job could not created!" });
    }
  };
}
