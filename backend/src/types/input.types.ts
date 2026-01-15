import type { UserRole } from "@prisma/client";


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
