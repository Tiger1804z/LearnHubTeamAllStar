import type {Request, Response} from "express";
import { z } from "zod";
import { createOptionService,
    createQuestionService,
    createQuizForLessonService,
    submitQuizService,
} from "../services/quiz.service";

const createQuizSchema = z.object({
    title: z.string().min(1, "Title is required"),
    passScore: z.number().int().min(0).max(100).default(70),
});

const createQuestionSchema = z.object({
    type: z.enum(["mcq", "short_answer","true_false"]),
    prompt: z.string().min(1, "Prompt is required"),
    position: z.number().int().min(1),
    expectedAnswer: z.string().optional(),
});

const createOptionSchema = z.object({
    text: z.string().min(1, "Option text is required"),
    isCorrect: z.boolean(),
});

const submitQuizSchema = z.object({
  quizId: z.string().min(1),
  answers: z.array(
    z.object({
      questionId: z.string().min(1),
      selectedOptionId: z.string().optional(),
      textAnswer: z.string().optional(),
    })
  ),
});

export const createQuizForLesson = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });

  const lessonId = req.params.lessonId;
  if (typeof lessonId !== "string" || !lessonId) {
    return res.status(400).json({ ok: false, error: "BAD_REQUEST", message: "Invalid lessonId" });
  }

  const parsed = createQuizSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ...parsed.error.flatten() });
  }

  try {
    const quiz = await createQuizForLessonService(
        lessonId,
         req.user.userId, 
         parsed.data);
    return res.status(201).json({ ok: true, quiz });
  } catch (e: any) {
    const msg = e?.message ?? "UNKNOWN_ERROR";
    if (msg === "LESSON_NOT_FOUND") return res.status(404).json({ ok: false, error: msg });
    if (msg === "QUIZ_ALREADY_EXISTS") return res.status(409).json({ ok: false, error: msg });
    if (msg === "FORBIDDEN_OWNER") return res.status(403).json({ ok: false, error: msg });
    return res.status(400).json({ ok: false, error: msg });
  }
}

export const createQuestion = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });

  const quizId = req.params.quizId;
  if (typeof quizId !== "string" || !quizId) {
    return res.status(400).json({ ok: false, error: "BAD_REQUEST", message: "Invalid quizId" });
  }

  const parsed = createQuestionSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: parsed.error.flatten() });
  }

  try {
    const question = await createQuestionService(quizId, req.user.userId, parsed.data);
    return res.status(201).json({ ok: true, question });
  } catch (e: any) {
    const msg = e?.message ?? "UNKNOWN_ERROR";
    if (msg === "QUIZ_NOT_FOUND") return res.status(404).json({ ok: false, error: msg });
    if (msg === "FORBIDDEN_OWNER") return res.status(403).json({ ok: false, error: msg });
    if (msg === "EXPECTED_ANSWER_REQUIRED") return res.status(400).json({ ok: false, error: msg });
    return res.status(400).json({ ok: false, error: msg });
  }
};

export const createOption = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });

  const questionId = req.params.questionId;
  if (typeof questionId !== "string" || !questionId) {
    return res.status(400).json({ ok: false, error: "BAD_REQUEST", message: "Invalid questionId" });
  }

  const parsed = createOptionSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: parsed.error.flatten() });
  }

  try {
    const option = await createOptionService(questionId, req.user.userId, parsed.data);
    return res.status(201).json({ ok: true, option });
  } catch (e: any) {
    const msg = e?.message ?? "UNKNOWN_ERROR";
    if (msg === "QUESTION_NOT_FOUND") return res.status(404).json({ ok: false, error: msg });
    if (msg === "FORBIDDEN_OWNER") return res.status(403).json({ ok: false, error: msg });
    if (msg === "NO_OPTIONS_FOR_SHORT_ANSWER") return res.status(400).json({ ok: false, error: msg });
    if (msg === "TRUE_FALSE_MAX_2_OPTIONS") return res.status(400).json({ ok: false, error: msg });
    if (msg === "ONLY_ONE_CORRECT_OPTION") return res.status(400).json({ ok: false, error: msg });
    return res.status(400).json({ ok: false, error: msg });
  }
};


export const submitQuiz = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ ok: false, error: "UNAUTHORIZED" });

  const parsed = submitQuizSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: "BAD_REQUEST", details: parsed.error.flatten() });
  }

  try {
    const attempt = await submitQuizService(req.user.userId, parsed.data);
    return res.status(201).json({ ok: true, attempt });
  } catch (e: any) {
    const msg = e?.message ?? "UNKNOWN_ERROR";
    if (msg === "QUIZ_NOT_FOUND") return res.status(404).json({ ok: false, error: msg });
    if (msg === "QUIZ_HAS_NO_QUESTIONS") return res.status(409).json({ ok: false, error: msg });
    return res.status(400).json({ ok: false, error: msg });
  }
};