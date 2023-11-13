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

  static getJobByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = parseInt(req.params.id, 10);
    try {
      const job = await JobService.getJobById(id);
      if (job) {
        res.status(200).json(job);
      } else {
        res.status(404).json({ message: "Job could not found for this id!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error occured!" });
    }
  };

  static getJobByTitleController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const title = req.params.title;
    try {
      const job = await JobService.getJobByTitle(title);
      if (job) {
        res.status(200).json(job);
      } else {
        res
          .status(404)
          .json({ message: "Job could not found for this title!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error occured!" });
    }
  };
}
