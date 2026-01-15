import prisma from "../prisma/prisma";

// temporaire pour live tant que lauth nest pas la
const getUserId = () => "cmkefe0bs0000j5osvwoeow88";

export const enroll = async (req: any, res: any) => {
  try {
    const userId = getUserId();
    const pathId = req.params.pathId;

    await prisma.enrollment.upsert({
      where: { userId_pathId: { userId, pathId } },
      update: {},
      create: { userId, pathId },
    });

    res.json({ success: true });
  } catch (err) {
    console.error("enroll error:", err);
    res.status(500).json({ error: "internal_error" });
  }
};

export const getProgress = async (req: any, res: any) => {
  try {
    const userId = getUserId();
    const pathId = req.params.pathId;

    const lessons = await prisma.lesson.findMany({
  where: { module: { pathId } },
  select: { id: true },
});
const lessonIds = (lessons as Array<{ id: string }>).map((l) => l.id);


    const progressRows = await prisma.lessonProgress.findMany({
  where: {
    userId,
    lessonId: { in: lessonIds },
  },
});

    const doneIds = new Set(
      progressRows.filter((p: typeof progressRows[0]) => p.isCompleted).map((p: typeof progressRows[0]) => p.lessonId)
    );

    const total = lessons.length;
    const completed = doneIds.size;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    res.json({
      pathId,
      totalLessons: total,
      completedLessons: completed,
      percent,
    });
  } catch (err) {
    console.error("getProgress error:", err);
    res.status(500).json({ error: "internal_error" });
  }
};
