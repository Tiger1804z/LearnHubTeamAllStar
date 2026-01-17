import prisma from "../prisma/prisma";
import type{
    CreateQuizzInput,
    CreateQuestionInput,
    CreateOptionInput,
    SubmitQuizzInput
} from "../types/question.types";

export const createQuizForLessonService = async (
    lessonId: string,
    userId: string,
    input: CreateQuizzInput
    ) =>{

        // check owenership of lesson
        const lesson = await prisma.lesson.findUnique({
            where: { id: lessonId },
            include: { module: { include: { path: true } } },
        });
        if (!lesson) {
            throw new Error("LESSON_NOT_FOUND");
        }
        if (lesson.module.path.creatorId !== userId) {
            throw new Error("UNAUTHORIZED");
        }

        const existing = await prisma.quiz.findUnique({
            where: { lessonId },
        });
        if (existing) {
            throw new Error("QUIZ_ALREADY_EXISTS_FOR_LESSON");
        }
        return prisma.quiz.create({
            data: {
                lessonId,
                title: input.title,
                passScore: input.passScore,
            },
        });
}

export const createQuestionService   = async(
    quizId: string,
    userId: string,
    input: CreateQuestionInput
) =>{
    const quiz = await prisma.quiz.findUnique({
        where: { id: quizId },
        include: { lesson: { include: { module: { include: { path: true } } } } },
    });
    if (!quiz) {
        throw new Error("QUIZ_NOT_FOUND");
    }
    if (quiz.lesson.module.path.creatorId !== userId) {
        throw new Error("UNAUTHORIZED");
    }
    if (input.type === "short_answer" && !input.expectedAnswer) {
        throw new Error("EXPECTED_ANSWER_REQUIRED");
    }
    const expectedAnswer = input.type === "short_answer" ? input.expectedAnswer : null;

    return prisma.question.create({
        data: {
            quizId,
            type: input.type,
            prompt: input.prompt,
            position: input.position,
            expectedAnswer,
        },
    });
}

export const createOptionService = async(
    questionId: string,
    userId: string,
    input: CreateOptionInput
) =>{
    const question = await prisma.question.findUnique({
        where: { id: questionId },
        include: { quiz: { include: { lesson: { include: { module: { include: { path: true } } } } } } },
    });
    if (!question) {
        throw new Error("QUESTION_NOT_FOUND");
    }
    if (question.quiz.lesson.module.path.creatorId !== userId) {
        throw new Error("UNAUTHORIZED");


    }
    // no options for short_answer questions
    if (question.type == "short_answer" ) {
        throw new Error("OPTIONS_NOT_ALLOWED_FOR_THIS_QUESTION_TYPE");
    }
    // for true_false questions, only two options allowed 
    if (question.type === "true_false"){
        const count = await prisma.option.count({
            where: { questionId },
        });
        if (count >= 2) {
            throw new Error("MAX_OPTIONS_REACHED_FOR_TRUE_FALSE_QUESTION");
        }

    }
    return prisma.option.create({
        data: {
            questionId,
            text: input.text,
            isCorrect: input.isCorrect ?? false,
        },
    });
}

export const submitQuizService = async (userId: string, input: SubmitQuizzInput) => {
  const quiz = await prisma.quiz.findUnique({
    where: { id: input.quizId },
    include: { questions: { include: { options: true } } },
  });

  if (!quiz) throw new Error("QUIZ_NOT_FOUND");
  if (quiz.questions.length === 0) throw new Error("QUIZ_HAS_NO_QUESTIONS");

  // forcer de tout repondre 
  if (input.answers.length !== quiz.questions.length) {
    throw new Error("QUIZ_INCOMPLETE");
  }

  let correct = 0;
  const answersToCreate: Array<{
    questionId: string;
    selectedOptionId: string | null;
    textAnswer: string | null;
  }> = [];

  for (const question of quiz.questions) {
    const userAnswer = input.answers.find((a) => a.questionId === question.id);
    if (!userAnswer) continue;

    let isCorrect = false;

    if (question.type === "mcq" || question.type === "true_false") {
      if (userAnswer.selectedOptionId) {
        const selected = question.options.find((o) => o.id === userAnswer.selectedOptionId);
        if (selected?.isCorrect) isCorrect = true;
      }
    }

    if (question.type === "short_answer") {
      const expected = question.expectedAnswer?.trim().toLowerCase();
      const got = userAnswer.textAnswer?.trim().toLowerCase();
      if (expected && got && expected === got) isCorrect = true;
    }

    if (isCorrect) correct++;

    answersToCreate.push({
      questionId: question.id,
      selectedOptionId: userAnswer.selectedOptionId ?? null,
      textAnswer: userAnswer.textAnswer ?? null,
    });
  }

  const scorePct = Math.round((correct / quiz.questions.length) * 100);
  const passed = scorePct >= quiz.passScore;

  return prisma.$transaction(async (tx) => {
    const attempt = await tx.quizAttempt.create({
      data: {
        quizId: quiz.id,
        userId,
        scorePct,
        passed,
        finishedAt: new Date(),
      },
    });

    if (answersToCreate.length > 0) {
      await tx.quizAnswer.createMany({
        data: answersToCreate.map((a) => ({
          ...a,
          attemptId: attempt.id,
        })),
      });
    }

    return attempt;
  });
};