import api from "@/lib/app";
import { JobsCountResponse, JobsResponse } from "../types/jobs.types";

export const NoOfLiveJobs = async (): Promise<number> => {
  const response = await api.get<JobsCountResponse>("/jobs/v1/jobs-count");
  return response.data.totalLiveJobs;
};

export const findLiveJobs = async ():Promise<JobsResponse> => {
  const response = await api.get<JobsResponse>("/jobs/v1");
  return response.data;
};
