import { RootState } from "@/stores/store";
import { Question } from "@/types/entities.type";
import { createSlice } from "@reduxjs/toolkit";

export interface QuestionType {
  questions: Question[];
  currentQuestion?: Question;
}

const initialState: QuestionType = {
  questions: [],
  currentQuestion: undefined,
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestions: (state, payload: { payload: Question[]; type: string }) => {
      state.questions = payload.payload;
    },
    setCurrentQuestion: (
      state,
      payload: { payload: Question; type: string }
    ) => {
      state.currentQuestion = payload.payload;
    },
  },
});

export const {
  setCurrentQuestion,
  setQuestions,
} = questionSlice.actions;

export const getCurrentQuestion = (state: RootState) =>
  state.question.currentQuestion;

export default questionSlice.reducer;
