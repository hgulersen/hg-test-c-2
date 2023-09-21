import { create } from "zustand";
import { fetchNQuestionsInParallel, fetchOneQuestion } from "../api/feed";
import { Image } from "react-native";

interface TimeSpentState {
  secondsSpentInSession: number;
  timer: NodeJS.Timeout | null;
  startTimeSpentTimer: () => void;
  teardown: () => void;
}

const useTimeSpentStore = create<TimeSpentState>()((set, get) => ({
  secondsSpentInSession: 0,
  timer: null,
  startTimeSpentTimer: () => {
    const timer = setInterval(() => {
      set({ secondsSpentInSession: get().secondsSpentInSession + 1 });
    }, 1000);
    set({ timer });
  },
  teardown: () => {
    const timer = get().timer;
    if (timer) {
      clearInterval(timer);
    }
  },
}));

export default useTimeSpentStore;
