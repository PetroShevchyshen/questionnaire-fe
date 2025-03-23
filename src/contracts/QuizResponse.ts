export interface QuizzesResponse {
  data: Quiz[];
  status: number;
}

export interface QuizResponse {
  data: Quiz;
  status: number;
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
  count: number;
}

export interface Question {
  _id: string;
  quiz: string;
  text: string;
  answers: Answer[];
}

export interface Answer {
  _id: string;
  question: string;
  text: string;
  isCorrect: boolean;
}
