export interface User {
  _id: string;
  name: string;
  email: string;
  role: "candidate" | "employer" | null;
  phone_no: string | null;
}
export interface LoginResponse {
  success: true;
  message: string;
  user: User;
  accessToken: string;
}
export interface SignUpResponse {
  success: true | false;
  message: string;
  user: User;
}
export interface RoleSaveResponse {
  success: true | false;
  message: string;
  user: User;
}
