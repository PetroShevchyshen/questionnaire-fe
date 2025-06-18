import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Quiz, QuizResponse, QuizzesResponse } from "../contracts/QuizResponse";
import api from "../api/axios";
import { QuizRequest } from "../contracts/QuizRequest";
import { IUserAnswer } from "../contracts/AnswerRequest";

interface QuizStore {
  quizList: Quiz[];
  quiz: Quiz | null;
  isLoading: boolean;
  sortBy: string;
  sortOrder: string;
  createQuiz: (body: QuizRequest) => Promise<{ success: boolean }>;
  getQuizzes: () => void;
  getQuiz: (id: string) => void;
  removeQuiz: (id: string) => void;
  sendAnswer: (data: IUserAnswer) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: string) => void;
}

const useQuizStore = create<QuizStore>()(
  devtools(
    immer((set) => ({
      quizList: [],
      quiz: null,
      isLoading: false,
      sortBy: "",
      sortOrder: "",
      getQuizzes: async () => {
        set({ isLoading: true });
        try {
          const { sortBy, sortOrder } = useQuizStore.getState();
          const params = new URLSearchParams();
          if (sortBy) params.append("sortField", sortBy);
          if (sortOrder) params.append("sortOrder", sortOrder);
          const url = params.size > 0 ? `/quiz?${params.toString()}` : "/quiz";

          const { data } = await api.get<QuizzesResponse>(url);

          set({ quizList: data.quizzes, isLoading: false });
        } catch (error) {
          console.error(error);
          set({ isLoading: false });
        }
      },
      getQuiz: async (id: string) => {
        set({ isLoading: true });
        try {
          const { data } = await api.get<Quiz>(`/quiz/${id}`);
          set({ quiz: data, isLoading: false });
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
      setSortBy: (sortBy) =>
        set((state) => {
          state.sortBy = sortBy;
        }),
      setSortOrder: (sortOrder) =>
        set((state) => {
          state.sortOrder = sortOrder;
        }),
    }))
  )
);

export default useQuizStore;
