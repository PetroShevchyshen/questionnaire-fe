import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Quiz, QuizResponse, QuizzesResponse } from "../contracts/QuizResponse";
import api from "../api/axios";
import { QuizRequest } from "../contracts/QuizRequest";

interface QuizStore {
  quizList: Quiz[];
  quiz: Quiz | null;
  isLoading: boolean;
  createQuiz: (body: QuizRequest) => Promise<{ success: boolean }>;
  getQuizzes: () => void;
  getQuiz: (id: string) => void;
}

const useQuizStore = create<QuizStore>()(
  devtools(
    immer((set) => ({
      quizList: [],
      quiz: null,
      isLoading: false,
      getQuizzes: async () => {
        set({ isLoading: true });
        try {
          const { data } = await api.get<QuizzesResponse>("/quiz");
          set({ quizList: data.data, isLoading: false });
        } catch (error) {
          console.error(error);
          set({ isLoading: false });
        }
      },
      getQuiz: async (id: string) => {
        set({ isLoading: true });
        try {
          const { data } = await api.get<QuizResponse>(`/quiz/${id}`);
          set({ quiz: data.data, isLoading: false });
        } catch (error) {
          console.error(error);
          set({ isLoading: false });
        }
      },
      createQuiz: async (body) => {
        set({ isLoading: true });
        try {
          await api.post<QuizResponse>("/quiz", body);
          set({ isLoading: false });
          return { success: true };
        } catch (error) {
          console.error(error);
          set({ isLoading: false });
          return { success: false };
        }
      },
    }))
  )
);

export default useQuizStore;
