import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "@/lib/_DATA";
import {
  setCurrentQuestion,
  setQuestions,
} from "@/stores/features/question/questionSlice";
import { RootState } from "@/stores/store";
import { Question } from "@/types/entities.type";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useQuestion = () => {
  const dispatch = useDispatch();
  const { currentQuestion, questions } = useSelector(
    (state: RootState) => state.question
  );

  useEffect(() => {
    getAllQuestions().then((data) => dispatch(setQuestions(data)));

    return () => {};
  }, [dispatch]);

  const getAllQuestions = async (): Promise<Question[]> => {
    return await _getQuestions().then((data) => Object.values(data!));
  };

  const getQuestionById = async (id: string) => {
    return await _getQuestions().then((data) =>
      Object.values(data!).find((item: Question) => item.id === id)
    );
  };

  const saveQuestionAnswer = async (data: {
    authedUser: string;
    qid: string;
    answer: "optionOne" | "optionTwo";
  }) => {
    return await _saveQuestionAnswer({ ...data });
  };

  const saveQuestion = async (question: {
    id: string;
    author: string;
    timestamp: number;
    optionOneText: string;
    optionTwoText: string;
  }) => {
    return await _saveQuestion({ ...question });
  };

  const setCurrentQuestionService = async (id: string) => {
    const currentQuestion = questions.find((item) => item.id === id);

    if (currentQuestion) {
      dispatch(setCurrentQuestion(currentQuestion as Question));
      return currentQuestion;
    } else {
      return false;
    }
  };

  return {
    getQuestionById,
    saveQuestionAnswer,
    saveQuestion,
    currentQuestion,
    setCurrentQuestionService,
    getAllQuestions,
    questions,
  };
};
