export interface QuizRequest {
  title: string;
  description: string;
  questions: Question[];
}

export interface Question {
  text: string;
  answers: Answer[];
}

export interface Answer {
  text: string;
  isCorrect: boolean;
}
