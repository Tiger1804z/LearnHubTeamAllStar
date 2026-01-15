import type {UserRole} from '../generated/prisma/enums';


export type JwtPayload = {
  userId: string;
  role: UserRole;
  email: string;
};