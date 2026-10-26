export interface CandidateProfile {
  skills: string[];
  preferredLocation: string[];
  preferredJobType: string[];
  resumeUrl: string;
}
export interface EmployerProfile {
  companyName: string;
  companySize: "1-10" | "11-50" | "51-200" | "201-500" | "500+";
  industry: string;
  description: string;
}
export interface User {
  _id: string;
  name: string;
  email: string;
  role: "candidate" | "employer" | null;
  phone_no: string | null;
  onboardingComplete: true | false;
  avatarUrl?: string;
  profile?: CandidateProfile | EmployerProfile;
}
export interface LoginResponse {
  success: true;
  message: string;
  user: User;
  accessToken: string | null;
}
export interface SignUpResponse {
  success: true | false;
  message: string;
  user: User;
}
export interface RefreshResponse {
  success: true | false;
  user: User;
  accessToken: string | null;
}
