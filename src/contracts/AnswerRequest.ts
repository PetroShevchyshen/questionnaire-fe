export interface IUserAnswer {
  quiz: string | undefined;
  answers: {
    questionId: string;
    selectedAnswerId: string;
  }[];
  score: number;
  timeSpent: number;
}
