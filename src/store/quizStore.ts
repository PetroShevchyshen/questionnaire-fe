import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Quiz, QuizResponse, QuizzesResponse } from "../contracts/QuizResponse";
import api from "../api/axios";
import { QuizRequest } from "../contracts/QuizRequest";
import { IUserAnswer } from "../contracts/AnswerRequest";
import { apiAnswerRoute, apiQuizRoute } from "../const/apiRoutes";

interface QuizStore {
  quizList: Quiz[];
  totalQuizzes: number;
  quiz: Quiz | null;
  isLoading: boolean;
  sortBy: string;
  sortOrder: string;
  createQuiz: (body: QuizRequest) => Promise<{ success: boolean }>;
  getQuizzes: (page?: number, limit?: number) => void;
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
      getQuizzes: async (page: number = 1, limit: number = 5) => {
        set({ isLoading: true });
        try {
          const { sortBy, sortOrder } = get();
          const params = new URLSearchParams();
          params.append("page", page.toString());
          params.append("limit", limit.toString());
          if (sortBy) {
            params.append("sortField", sortBy);
            params.append("sortOrder", sortOrder);
          }
          const url = apiQuizRoute;
          const { data } = await api.get<QuizzesResponse>(url, { params });

          set((state) => {
            state.quizList = [...state.quizList, ...data.quizzes];
            state.totalQuizzes = data.quizzesCount;
          });
        } catch (error) {
          console.error(error);
        } finally {
          set({ isLoading: false });
        }
      },
      getQuiz: async (id: string) => {
        set({ isLoading: true });
        try {
          const { data } = await api.get<Quiz>(`${apiQuizRoute}/${id}`);
          set({ quiz: data });
        } catch (error) {
          console.error(error);
          set({ isLoading: false });
        } finally {
          set({ isLoading: false });
        }
      },
      createQuiz: async (body) => {
        set({ isLoading: true });
        try {
          await api.post<QuizResponse>(apiQuizRoute, body);
          return { success: true };
        } catch (error) {
          console.error(error);
          return { success: false };
        } finally {
          set({ isLoading: false });
        }
      },
      removeQuiz: async (id) => {
        try {
          await api.delete(`${apiQuizRoute}/${id}`);
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
          await api.post(apiAnswerRoute, data);
          return { success: true };
        } catch (error) {
          console.error(error);
          return { success: false };
        }
      },
      setSortBy: (sortBy) =>
        set((state) => {
          state.sortBy = sortBy;
          state.quizList = [];
        }),
      setSortOrder: (sortOrder) =>
        set((state) => {
          state.sortOrder = sortOrder;
          state.quizList = [];
        }),
    }))
  )
);

export default useQuizStore;
