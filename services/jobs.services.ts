import api from "@/lib/app";
import { Job, JobsCountResponse, JobsResponse } from "../types/jobs.types";

export interface FindJobsParams {
  keyword?: string;
  location?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export const NoOfLiveJobs = async (): Promise<number> => {
  const response = await api.get<JobsCountResponse>("/jobs/v1/jobs-count");
  return response.data.totalLiveJobs;
};

export const findLiveJobs = async (
  params?: FindJobsParams
): Promise<JobsResponse> => {
  const response = await api.get<JobsResponse>('/jobs/v1', {
    params: params
  });

  return response.data;
};

export const getJobDetailPublic = async (id: string):Promise<Job> => {
  const response = await api.get<Job>(`/jobs/v1/detail/${id}`);
  return response.data;
};
