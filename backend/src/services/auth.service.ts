import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";

import type { JwtPayload  } from "../types/auth.types";

const JWT_SECRET_ENV = process.env.JWT_SECRET;
if (!JWT_SECRET_ENV) throw new Error("JWT_SECRET is not defined");
const JWT_SECRET: string = JWT_SECRET_ENV;

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";





export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: JwtPayload) {
  type ExpiresIn = Exclude<SignOptions["expiresIn"], undefined>;

  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as ExpiresIn,
  };

  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}
