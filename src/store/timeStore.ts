import { create } from "zustand";

interface TimerState {
  finalTime: string | null;
  unFormattedFinalTime: number;
  setFinalTime: (time: string) => void;
  setUnformattedTime: (time: number) => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  finalTime: null,
  unFormattedFinalTime: 0,
  setFinalTime: (time) => set({ finalTime: time }),
  setUnformattedTime: (time) => set({ unFormattedFinalTime: time }),
}));
