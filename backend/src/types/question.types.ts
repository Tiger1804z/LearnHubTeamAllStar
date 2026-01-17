import type { QuestionType } from "../generated/prisma/enums";
// create question types based on prisma schema

export type CreateQuizzInput = {
    title: string;
    passScore: number; 
};

export type CreateQuestionInput = {
    type: QuestionType;
    prompt: string;
    position: number;
    expectedAnswer?: string ; // seulement pour les questions de type "short_answer"
};

export type  CreateOptionInput = {
    text: string;
    isCorrect: boolean;
};

export type SubmitQuizzInput = {
  quizId: string;
  answers: Array<{
    questionId: string;
    selectedOptionId?: string; // mcq / true_false
    textAnswer?: string; // short_answer
  }>;
};
