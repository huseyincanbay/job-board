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

  static getAllApplicationsController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const applications = await ApplicationService.getAllApplications();
      if (applications !== undefined) {
        res.status(200).json(applications);
      } else {
        res.status(404).json({ message: "Application could not be found!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error occured!" });
    }
  };

  static getApplicationByUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = parseInt(req.params.id, 10);
      const applicationByUser = await ApplicationService.getApplicationByUser(
        userId
      );
      if (applicationByUser) {
        res.status(200).json(applicationByUser);
      } else {
        res
          .status(404)
          .json({ message: `Application with User ID ${userId} not found` });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error occured!" });
    }
  };

  static getApplicationByJobController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const jobId = parseInt(req.params.id, 10);
      const applicationByApplication =
        await ApplicationService.getApplicationByJob(jobId);
      if (applicationByApplication) {
        res.status(200).json(applicationByApplication);
      } else {
        res
          .status(404)
          .json({ message: `Application with Job ID ${jobId} not found` });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error occured!" });
    }
  };

  static getApplicationByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const applicationId = parseInt(req.params.id, 10);
      const application = await ApplicationService.getApplicationById(
        applicationId
      );
      if (applicationId) {
        res.status(200).json(application);
      } else {
        res
          .status(404)
          .json({ message: `Application with ID ${applicationId} not found` });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error occured!" });
    }
  };

  static updateApplicationController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { applicationId } = req.params;
    const { updatedStatus } = req.body;
    try {
      const updatedApplication = await ApplicationService.updateApplication(
        parseInt(applicationId, 10),
        updatedStatus
      );
      if (updatedApplication) {
        res.status(200).json(updatedApplication);
      } else {
        res
          .status(404)
          .json({ message: `Application with ID ${applicationId} not found` });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error occured!" });
    }
  };

  static deleteApplicationController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const applicationId = parseInt(req.params.id, 10);
    try {
      const application = await ApplicationService.deleteApplication(
        applicationId
      );
      if (application) {
        res.status(200).json(application);
      } else {
        res.status(404).json({
          message:
            "No Application with ID ${applicationId} to delete not found!",
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error occured!" });
    }
  };
}
