import { Application } from "../entities/Application";
import { userRepository } from "../repositories/UserRepository";
import { jobRepository } from "../repositories/JobRepository";
import { applicationRepository } from "../repositories/ApplicationRepository";

export class ApplicationService {
  static createApplication = async (
    userId: number,
    jobId: number,
    status: string
  ): Promise<Application> => {
    try {
      const user = await userRepository.findOne({ where: { id: userId } });
      const job = await jobRepository.findOne({ where: { id: jobId } });

      if (!user || !job) {
        throw new Error("User or Job could not found!");
      }

      const newApplication = new Application();
      newApplication.user = [user];
      newApplication.job = [job];
      newApplication.status = status;

      const savedApplication = await applicationRepository.save(newApplication);
      return savedApplication;
    } catch (error) {
      throw error;
    }
  };

  static getAllApplications = async (): Promise<Application[]> => {
    try {
      return await applicationRepository.find();
    } catch (error) {
      throw error;
    }
  };

  static getApplicationById = async (
    applicationId: number
  ): Promise<Application | undefined> => {
    try {
      const application = await applicationRepository
        .createQueryBuilder()
        .select("application")
        .from(Application, "application")
        .leftJoinAndSelect("application.user", "user")
        .leftJoinAndSelect("application.job", "job")
        .where("application.id = :id", { id: applicationId })
        .getOne();
      return application as Application | undefined;
    } catch (error) {
      throw error;
    }
  };

  static updateApplication = async (
    applicationId: number,
    updatedStatus: string
  ): Promise<Application | undefined> => {
    try {
      const application = await applicationRepository.findOne({
        where: { id: applicationId },
      });

      if (!application) {
        throw new Error();
      }

      application.status = updatedStatus;
      const updatedApplication = await applicationRepository.save(application);

      return updatedApplication;
    } catch (error) {
      throw error;
    }
  };

  static deleteApplication = async (
    applicationId: number
  ): Promise<Application | undefined> => {
    try {
      const deletedApplication = await applicationRepository.findOneBy({
        id: applicationId,
      });
      if (deletedApplication) {
        await applicationRepository.remove(deletedApplication);
        return deletedApplication;
      } else {
        return undefined;
      }
    } catch (error) {
      throw error;
    }
  };
}
