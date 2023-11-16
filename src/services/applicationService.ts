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
}
