import type { UserRole } from "../generated/prisma/enums";
import type { LoginInput, SignupInput } from "../types/input.types";
import prisma from "../prisma/prisma";
import * as auth from "./auth.services";


const allowedRolesForSignup = new Set<UserRole>(["learner", "creator","mentor"]);

export const signupService = async (data: SignupInput) => {
    const { first_name, last_name, email, password } = data;

    if (data.role && !allowedRolesForSignup.has(data.role)) {
        throw new Error("Invalid role for signup");
    }

    const role: UserRole = data.role ?? "learner";

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    const hashedPassword = await auth.hashPassword(password);

    const displayName = `${first_name} ${last_name}`.trim();

    const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      role,
      profile: {
        create: {
          displayName: displayName.length ? displayName : email.split("@")[0],
        },
      },
    },
    include: { profile: true },
  });

  const token = auth.signToken({
    userId: user.id,
    role: user.role,
    email: user.email,
  });
  // enlever passwordHash du retour
  const{passwordHash:_pw,...safeUser}=user;

  return { user: safeUser, token };

}

export const loginService = async (data: LoginInput) => {
    const { email, password } = data;
    const user = await prisma.user.findUnique({
        where: { email },
        include: { profile: true },
    });
    if (!user|| !user.passwordHash) {
        throw new Error("Invalid email or password");
    }

    const ok = await auth.verifyPassword(password, user.passwordHash);
    if (!ok) {
        throw new Error("Invalid email or password");
    }

    const token = auth.signToken({
        userId: user.id,
        role: user.role,
        email: user.email,
    });
    // enlever passwordHash du retour
    const{passwordHash:_pw,...safeUser}=user;
    return { user: safeUser, token };
}



