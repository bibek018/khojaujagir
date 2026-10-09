import { User } from "./auth.types";

export type UserCandidateOnboard = {
  _id: string;
  name: string;
  email: string;
  role: "candidate" | "employer";
  phone_no: string | null;
  onboardingComplete: true;
  avatarUrl: string;
  profile: {
    resumeUrl: string;
    skills: string[];
    preferredLocation: string[];
    preferredJobType: string[];
  };
};

export type UserEmployerOnboard = {
  _id: string;
  name: string;
  email: string;
  role: "candidate" | "employer";
  phone_no: string | null;
  onboardingComplete: true;
  avatarUrl: string;
  profile: {
    companyName: string;
    companySize: "1-10" | "11-50" | "51-200" | "201-500" | "500+";
    description: string;
    industry: string;
    companyLogo: string;
  };
};
export type RoleSaveResponse = {
  success: true | false;
  message: string;
  user: User;
};

export type Role = "employer" | "candidate" | null;
export type OnBoardCandidateResponse = {
  success: true;
  message: string;
  user: UserCandidateOnboard;
};

export type OnBoardEmployerResponse = {
  success: true;
  message: string;
  user: UserEmployerOnboard;
};
