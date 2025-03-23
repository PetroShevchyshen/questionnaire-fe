import { create } from "zustand";

interface TimerState {
  finalTime: string | null;
  setFinalTime: (time: string) => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  finalTime: null,
  setFinalTime: (time) => set({ finalTime: time }),
}));
