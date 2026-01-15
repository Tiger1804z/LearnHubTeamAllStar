import type { PathLevel, UserRole } from "../generated/prisma/enums";

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


export type UpdatePathInput = Partial<{
  title: string;
  description: string;
  category: string;
  level: PathLevel;
  estMinutes: number | null;
}>;