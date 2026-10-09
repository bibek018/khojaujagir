export interface User {
  _id: string;
  name: string;
  email: string;
  role: "candidate" | "employer" | null;
  phone_no: string | null;
  onboardingComplete: true | false;
}
export interface LoginResponse {
  success: true;
  message: string;
  user: User;
  accessToken: string|null;
}
export interface SignUpResponse {
  success: true | false;
  message: string;
  user: User;
}
export interface RefreshResponse {
  success: true | false;
  user: User;
  accessToken: string|null;
}
