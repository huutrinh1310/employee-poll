import { RootState } from "@/stores/store";
import { Question } from "@/types/entities.type";
import { createSlice } from "@reduxjs/toolkit";

export interface QuestionType {
  newQuestion: Question[] | null;
  doneQuestion: Question[] | null;
  currentQuestion: Question | null;
}

const initialState: QuestionType = {
  newQuestion: null,
  doneQuestion: null,
  currentQuestion: null,
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setNewQuestion: (state, payload: { payload: Question[]; type: string }) => {
      state.newQuestion = payload.payload;
    },
    setDoneQuestion: (
      state,
      payload: { payload: Question[]; type: string }
    ) => {
      state.doneQuestion = payload.payload;
    },
    setCurrentQuestion: (state, payload: { payload: string; type: string }) => {
      const allQuestion = [...state.newQuestion!, ...state.doneQuestion!];
      state.currentQuestion = allQuestion.find(
        (item) => item.id === payload.payload
      )!;
    },
  },
});

export const { setCurrentQuestion, setNewQuestion, setDoneQuestion } =
  questionSlice.actions;

export const getNewQuestion = (state: RootState) => state.question.newQuestion;
export const getDoneQuestion = (state: RootState) =>
  state.question.doneQuestion;
export const getCurrentQuestion = (state: RootState) =>
  state.question.currentQuestion;

export default questionSlice.reducer;
