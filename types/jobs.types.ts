export type JobsCountResponse = {
  success: true | false;
  message: string;
  totalLiveJobs: number;
};

export interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: "NPR" | "USD";
    period: string;
  };
  type: "Full-time" | "Part-time" | "Internship" | "Freelance" | "Contract";
  status: "Open" | "Closed" | "Draft";
  postedBy: string;
}
export interface JobsResponse {
  sucess: true | false;
  message: string;
  jobs: Job[];
  pagination: {
    page: number;
    limit: number;
    totalJobs: number;
    totalPages: number;
  };
}

export type JobType =
  | "Full-time"
  | "Part-time"
  | "Internship"
  | "Freelance"
  | "Contract";

export type Application = {
  status: "Open" | "Closed" | "Draft";
  appliedDate: string;
  resumeUrl: string;
  jobId: string;
};
