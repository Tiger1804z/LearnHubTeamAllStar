import type { UserRole } from "../generated/prisma/enums";
import type { LoginInput, SignupInput } from "../types/input.types";
import prisma from "../prisma/prisma";
import * as auth from "./auth.service";


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




// user connecté, ses cours avec progression
export const getMyLearningPathService = async (userId: string) => {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: {
      path: {
        include: {
          modules: {
            include: {
              lessons: {
                include: {
                  progress: {
                    where: { userId },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return enrollments.map((enrollment) => {
    const lessons = enrollment.path.modules.flatMap(
      (m) => m.lessons
    );

    const completed = lessons.filter(
      (l) => l.progress[0]?.isCompleted
    ).length;

    const progressPercent =
      lessons.length === 0
        ? 0
        : Math.round((completed / lessons.length) * 100);

    return {
      id: enrollment.path.id,
      title: enrollment.path.title,
      progressPercent,
    };
  });
};
