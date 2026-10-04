export type UserRole = "candidate" | "employer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
  onboardingComplete?: boolean;
  avatarUrl?: string;
}

export interface AuthResponse {
  user?: User;
  token?: string;
  accessToken?: string;
  message?: string;
}
