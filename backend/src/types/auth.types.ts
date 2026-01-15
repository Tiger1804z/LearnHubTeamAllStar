import type { UserRole } from "@prisma/client";

export type JwtPayload = {
  userId: string;
  role: UserRole;
  email: string;
};