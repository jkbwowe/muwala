import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Answers = {
  [key: string]: string; // e.g., qn1: "2005", qn7: "Most of the time"
};

type AssessmentStore = {
  answers: Answers;
  setAnswer: (qn: string, value: string) => void;
  clearAnswers: () => void;
};

export const useAssessmentStore = create<AssessmentStore>()(
  persist(
    (set) => ({
      answers: {},
      
      setAnswer: (qn, value) =>
        set((state) => ({
          answers: { ...state.answers, [qn]: value },
        })),

      clearAnswers: () => set({ answers: {} }),
    }),
    {
      name: 'hsh-assessment-storage', // The key used in localStorage
    }
  )
);