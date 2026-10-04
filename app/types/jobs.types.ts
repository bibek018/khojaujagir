export type JobsCountResponse = {
  success: true | false;
  message: string;
  totalLiveJobs: number;
};

export interface Job {
  id?: string;
  companyName?: string;
  company?: string;
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
