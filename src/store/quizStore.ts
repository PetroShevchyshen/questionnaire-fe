import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Quiz, QuizResponse, QuizzesResponse } from "../contracts/QuizResponse";
import api from "../api/axios";
import { QuizRequest } from "../contracts/QuizRequest";
import { IUserAnswer } from "../contracts/AnswerRequest";

interface QuizStore {
  quizList: Quiz[];
  totalQuizzes: number;
  quiz: Quiz | null;
  isLoading: boolean;
  sortBy: string;
  sortOrder: string;
  createQuiz: (body: QuizRequest) => Promise<{ success: boolean }>;
  getQuizzes: (page?: string, limit?: string) => void;
  getQuiz: (id: string) => void;
  removeQuiz: (id: string) => void;
  sendAnswer: (data: IUserAnswer) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: string) => void;
}

const useQuizStore = create<QuizStore>()(
  devtools(
    immer((set, get) => ({
      quizList: [],
      totalQuizzes: 0,
      quiz: null,
      isLoading: false,
      sortBy: "",
      sortOrder: "",
      getQuizzes: async (page: string = "1", limit: string = "") => {
        set({ isLoading: true });
        try {
          const { sortBy, sortOrder } = get();
          const params = new URLSearchParams();
          params.append("page", page);
          if (sortBy) {
            params.append("sortField", sortBy);
            params.append("sortOrder", sortOrder);
          }
          const url = "/quiz";
          console.log("page", page);
          const { data } = await api.get<QuizzesResponse>(url, { params });
          console.log("data", data);
          set((state) => {
            state.quizList =
              page === "1"
                ? data.quizzes
                : [...state.quizList, ...data.quizzes];
            state.totalQuizzes = data.quizzesCount;
            state.isLoading = false;
          });
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
