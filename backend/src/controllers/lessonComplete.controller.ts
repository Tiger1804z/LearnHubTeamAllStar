import type { Request, Response } from "express";
import prisma from "../prisma/prisma";

const DEFAULT_LESSON_XP = 10;

export const completeLesson = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });
  }

  const userId = req.user.userId;
  const lessonId = req.params.id;

  if (typeof lessonId !== "string" || lessonId.length === 0) {
    return res.status(400).json({ ok: false, error: "BAD_REQUEST" });
  }

  try {
    console.log("DATABASE_URL =", process.env.DATABASE_URL);
    console.log("DB_URL =", process.env.DB_URL);
    console.log("lessonId reçu:", lessonId);

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      select: { id: true },
    });

    if (!lesson) {
      return res.status(404).json({ ok: false, error: "LESSON_NOT_FOUND" });
    }

    const existing = await prisma.lessonProgress.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
    });

    if (existing?.isCompleted) {
      return res.status(200).json({
        ok: true,
        completed: true,
        alreadyCompleted: true,
      });
    }

    const now = new Date();

    await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: { isCompleted: true, completedAt: now },
      create: { userId, lessonId, isCompleted: true, completedAt: now },
    });

    await prisma.xPTransaction.create({
      data: {
        userId,
        source: "lesson",
        sourceId: lessonId,
        points: DEFAULT_LESSON_XP,
      },
    });

    await prisma.profile.update({
      where: { userId },
      data: { xp: { increment: DEFAULT_LESSON_XP } },
    });

    return res.status(200).json({
      ok: true,
      completed: true,
      alreadyCompleted: false,
      addedXp: DEFAULT_LESSON_XP,
    });
  } catch (e) {
    console.error("completeLesson error:", e);
    return res.status(500).json({ ok: false, error: "INTERNAL_ERROR" });
  }
};

