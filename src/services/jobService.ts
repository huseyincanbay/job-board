import { Job } from "../entities/Job";
import { User } from "../entities/User";
import { jobRepository } from "../repositories/JobRepository";
import { Request, Response, NextFunction } from "express";
import { subDays } from "date-fns";
import { Between } from "typeorm";
import {
  validateSalary,
  validateLocation,
  validatePublicationDate,
} from "../helpers/jobSearchValidations";

export class JobService {
  static createJob = async (
    req: Request,
    data: {
      title: string;
      company: string;
      description: string;
      requirements: string;
      location: string;
      salary: number;
    }
  ): Promise<Job> => {
    try {
      const userId = req.locals.jwtPayload?.userId;

      if (userId === undefined) {
        throw new Error("User not authenticated");
      }

      const job = new Job();
      job.title = data.title;
      job.company = data.company;
      job.description = data.description;
      job.requirements = data.requirements;
      job.location = data.location;
      job.salary = data.salary;

      job.user = { id: userId } as User;

      if (data.salary < 0) {
        throw new Error("Salary must be a non-negative value");
      }

      const savedJob = await jobRepository.save(job);
      return savedJob;
    } catch (error) {
      throw error;
    }
  };

  static getAllJobs = async (): Promise<Job[]> => {
    try {
      return await jobRepository.find();
    } catch (error) {
      throw error;
    }
  };

  static getJobById = async (jobId: number): Promise<Job | undefined> => {
    try {
      const job = await jobRepository
        .createQueryBuilder()
        .select("job")
        .from(Job, "job")
        .leftJoinAndSelect("job.user", "user")
        .where("job.id = :id", { id: jobId })
        .getOne();
      return job as Job | undefined;
    } catch (error) {
      throw error;
    }
  };

  static getJobByTitle = async (title: string): Promise<Job | undefined> => {
    try {
      const job = await jobRepository.findOneBy({ title: title });
      return job as Job | undefined;
    } catch (error) {
      throw error;
    }
  };

  // static getJobBySalary = async (salary: number): Promise<Job | undefined> => {
  //   try {
  //     const jobBySalary = await jobRepository.findOneBy({ salary: salary });
  //     return jobBySalary as Job | undefined;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  static searchJobs = async (filters: any): Promise<Job[]> => {
    try {
      const validatedSalaryFrom = validateSalary(filters.salaryFrom);
      const validatedSalaryTo = validateSalary(filters.salaryTo);
      const validatedLocation = validateLocation(filters.location);
      const validatedPublicationDate = validatePublicationDate(filters.publicationDate);

      const query = jobRepository.createQueryBuilder("job");

      if (
        validatedSalaryFrom !== undefined &&
        validatedSalaryTo !== undefined
      ) {
        query.andWhere("job.salary BETWEEN :salaryFrom AND :salaryTo", {
          salaryFrom: validatedSalaryFrom,
          salaryTo: validatedSalaryTo,
        });
      } else if (validatedSalaryFrom !== undefined) {
        query.andWhere("job.salary >= :salaryFrom", {
          salaryFrom: validatedSalaryFrom,
        });
      } else if (validatedSalaryTo !== undefined) {
        query.andWhere("job.salary <= :salaryTo", {
          salaryTo: validatedSalaryTo,
        });
      }

      if (validatedLocation !== undefined) {
        query.andWhere("job.location = :location", {
          location: validatedLocation,
        });
      }

      if (validatedPublicationDate !== undefined) {
        let dateFilter: Date | undefined;

        switch (validatedPublicationDate) {
          case "last24Hours":
            dateFilter = subDays(new Date(), 1);
            break;
          case "last3Days":
            dateFilter = subDays(new Date(), 3);
            break;
          case "last7Days":
            dateFilter = subDays(new Date(), 7);
            break;
          case "last15Days":
            dateFilter = subDays(new Date(), 15);
            break;
          case "last30Days":
            dateFilter = subDays(new Date(), 30);
            break;
          default:
            throw Error;
        }

        if (dateFilter) {
          query.andWhere("job.createdAt >= :dateFilter", { dateFilter });
        }
      }

      const jobs = await query
        .leftJoinAndSelect("job.user", "user")
        .leftJoinAndSelect("job.applications", "applications")
        .getMany();

      return jobs;
    } catch (error) {
      throw error;
    }
  };

  static updateJob = async (id: number, data: {
    title: string;
    company: string;
    description: string;
    requirements: string;
    location: string;
    salary: number;
  }) => {}

  static deleteJobById = async (id: number) => {}
}
