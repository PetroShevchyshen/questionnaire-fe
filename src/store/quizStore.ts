import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Quiz, QuizResponse, QuizzesResponse } from "../contracts/QuizResponse";
import api from "../api/axios";
import { QuizRequest } from "../contracts/QuizRequest";

interface Answer {
  quiz: string | undefined;
  answers: {
    questionID: string;
    selectedAnswerId: string;
  }[];
}
interface QuizStore {
  quizList: Quiz[];
  quiz: Quiz | null;
  isLoading: boolean;
  createQuiz: (body: QuizRequest) => Promise<{ success: boolean }>;
  getQuizzes: () => void;
  getQuiz: (id: string) => void;
  removeQuiz: (id: string) => void;
  sendAnswer: (data: Answer) => void;
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
      removeQuiz: async (id) => {
        try {
          await api.delete(`/quiz/${id}`);
          set((state) => ({
            quizList: state.quizList.filter((quiz) => quiz._id !== id),
          }));
          return { success: true };
        } catch (error) {
          console.error(error);
          return { success: false };
        }
      },
      sendAnswer: async (data) => {
        try {
          await api.post(`/answer`, data);
          return { success: true };
        } catch (error) {
          console.error(error);
          return { success: false };
        }
      },
    }))
  )
);

export default useQuizStore;
