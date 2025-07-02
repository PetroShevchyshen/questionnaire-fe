import { create } from "zustand";
import { AverageResponse } from "../contracts/AverageRersponse";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import api from "../api/axios";

interface AnalyticStore {
  average: AverageResponse[];
  isLoading: boolean;
  getAverage: () => void;
}

export const useAnalyticStore = create<AnalyticStore>()(
  devtools(
    immer((set) => ({
      average: [],
      isLoading: false,
      getAverage: async () => {
        set({ isLoading: true });
        try {
          const { data } = await api.get<AverageResponse[]>("/avgAnswers");
          set({ average: data, isLoading: false });
        } catch (error) {
          console.error(error);
          set({ isLoading: false });
        }
      },
    }))
  )
);
