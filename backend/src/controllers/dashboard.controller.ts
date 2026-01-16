import type { Request, Response } from "express";
import prisma from "../prisma/prisma";

const DEFAULT_LESSON_XP = 10;

const startOfDayUTC = (d: Date) => {
  const x = new Date(d);
  x.setUTCHours(0, 0, 0, 0);
  return x;
};

export const computeStreakFromDates = (completedAtDates: Date[]) => {
  if (completedAtDates.length === 0) return 0;

  const daySet = new Set<number>();
  for (const dt of completedAtDates) daySet.add(startOfDayUTC(dt).getTime());

  const today = startOfDayUTC(new Date()).getTime();
  const yesterday = today - 24 * 60 * 60 * 1000;

  if (!daySet.has(today) && !daySet.has(yesterday)) return 0;

  let streak = 0;
  let cursor = daySet.has(today) ? today : yesterday;

  while (daySet.has(cursor)) {
    streak += 1;
    cursor -= 24 * 60 * 60 * 1000;
  }

  return streak;
};

export const getMyDashboard = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  }

  const userId = req.user.userId;

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
      select: { xp: true },
    });

    const completedRows = await prisma.lessonProgress.findMany({
      where: { userId, isCompleted: true, completedAt: { not: null } },
      select: { completedAt: true },
      orderBy: { completedAt: "desc" },
      take: 365,
    });

    const dates = completedRows
      .map((r) => r.completedAt)
      .filter((d): d is Date => d instanceof Date);

    const streak = computeStreakFromDates(dates);

    const enrollments = await prisma.enrollment.findMany({
      where: { userId, status: "active" },
      include: {
        path: {
          select: { id: true, title: true, category: true, level: true, estMinutes: true },
        },
      },
      orderBy: { startedAt: "desc" },
      take: 20,
    });

    const currentPaths = await Promise.all(
      enrollments.map(async (enr) => {
        const pathId = enr.pathId;

        const totalLessons = await prisma.lesson.count({
          where: { module: { pathId } },
        });

        const completedLessons = await prisma.lessonProgress.count({
          where: { userId, isCompleted: true, lesson: { module: { pathId } } },
        });

        const percent = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

        return {
          path: enr.path,
          startedAt: enr.startedAt,
          progress: { totalLessons, completedLessons, percent },
        };
      })
    );

    return res.status(200).json({
      ok: true,
      xp: profile?.xp ?? 0,
      streak,
      currentPaths,
      lessonXp: DEFAULT_LESSON_XP,
    });
  } catch (e) {
    console.error("getMyDashboard error:", e);
    return res.status(500).json({ ok: false, error: "INTERNAL_ERROR" });
  }
};
