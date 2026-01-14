import type { UserRole } from "../generated/prisma/enums";

export type LoginInput = {
  email: string;
  password: string;
};

export type SignupInput = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role?: UserRole;
};
