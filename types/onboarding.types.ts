import { User } from "./auth.types";

export type RoleSaveResponse = {
  success: true | false;
  message: string;
  user: User;
};
