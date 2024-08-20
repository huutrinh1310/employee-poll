import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "@/lib/_DATA";
import {
  setDoneQuestion,
  setNewQuestion,
} from "@/stores/features/question/questionSlice";
import { RootState } from "@/stores/store";
import { Question } from "@/types/entities.type";
import { useDispatch, useSelector } from "react-redux";

export const useQuestion = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.authen.user);

  const getNewQuestions = async (): Promise<Question[]> => {
    return await _getQuestions().then((data) =>
      Object.values(data!).filter(
        (item: Question) =>
          !item.optionOne.votes.includes(user?.id as string) &&
          !item.optionTwo.votes.includes(user?.id as string)
      )
    );
  };

  const getDoneQuestions = async (): Promise<Question[]> => {
    return await _getQuestions().then((data) =>
      Object.values(data!).filter(
        (item: Question) =>
          item.optionOne.votes.includes(user?.id as string) ||
          item.optionTwo.votes.includes(user?.id as string)
      )
    );
  };

  const fetchQuestion = async () => {
    try {
      const newQuestions = await getNewQuestions();
      const doneQuestions = await getDoneQuestions();
      console.log(newQuestions, doneQuestions);

      if (newQuestions && doneQuestions) {
        dispatch(setNewQuestion(newQuestions));
        dispatch(setDoneQuestion(doneQuestions));
      }
    } catch (err) {
      console.log(err);
    }
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

  return { fetchQuestion, getQuestionById, saveQuestionAnswer, saveQuestion };
};
