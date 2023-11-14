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

  static getAllJobsController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const jobs = await JobService.getAllJobs();
      if (jobs !== undefined) {
        res.status(200).json(jobs);
      } else {
        res.status(404).json({ message: "No job found!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error occured!" });
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

  // static getJobBySalaryController = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   const salary = parseInt(req.params.salary, 10);
  //   try {
  //     const jobBySalary = await JobService.getJobBySalary(salary);
  //     if (jobBySalary) {
  //       res.status(200).json(jobBySalary);
  //     } else {
  //       res
  //         .status(404)
  //         .json({ message: "Job could not found for this salary!" });
  //     }
  //   } catch (error) {
  //     res.status(500).json({ message: "Internal Server Error occured!" });
  //   }
  // };

  static searchJobsController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const filters = req.body;
    try {
      const jobs = await JobService.searchJobs(filters);
      if (jobs.length > 0) {
        res.status(200).json(jobs);
      } else {
        res
          .status(404)
          .json({ message: "Jobs could not found with the provided filters!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error occured!" });
    }
  };
}
