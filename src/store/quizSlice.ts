
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuizState {
  questions: {
    id: number;
    question: string;
    options: string[];
    answer: number;
  }[];
  current: number;
  selected: number | null;
  answers: number[];
  submitted: boolean;
}

const initialState: QuizState = {
  questions: [],
  current: 0,
  selected: null,
  answers: [],
  submitted: false,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<QuizState["questions"]>) => {
      state.questions = action.payload;
    },
    selectOption: (state, action: PayloadAction<number>) => {
      state.selected = action.payload;
    },
    nextQuestion: (state) => {
      if (state.selected !== null) {
        state.answers[state.current] = state.selected;
        state.selected = null;
        state.current += 1;
      }
    },
    prevQuestion: (state) => {
      state.current -= 1;
      state.selected = state.answers[state.current] ?? null;
    },
    submitQuiz: (state) => {
      if (state.selected !== null) {
        state.answers[state.current] = state.selected;
      }
      state.submitted = true;
    },
    resetQuiz: (state) => {
      state.current = 0;
      state.selected = null;
      state.answers = [];
      state.submitted = false;
    },
  },
});

export const {
  setQuestions,
  selectOption,
  nextQuestion,
  prevQuestion,
  submitQuiz,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
