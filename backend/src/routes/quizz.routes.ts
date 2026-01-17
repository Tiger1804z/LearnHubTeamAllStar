import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  createQuizForLesson,
  createQuestion,
  createOption,
    submitQuiz
} from "../controllers/quizz.controller";

const router = Router();

// Création (protégé creator/owner)
router.post("/lessons/:lessonId/quizz", authenticate, createQuizForLesson);
router.post("/quizzes/:quizId/questions", authenticate, createQuestion);
router.post("/questions/:questionId/options", authenticate, createOption);

router.post("/quizzes/submit",authenticate, submitQuiz);

export default router;
