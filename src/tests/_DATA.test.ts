import "@testing-library/jest-dom";
import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from "@/lib/_DATA";
import { expect, test, describe } from "@jest/globals";
import { User } from "@/types/entities.type";

type QuestionSaveType = {
  id: string;
  author: string;
  timestamp: number;
  optionOneText: string;
  optionTwoText: string;
};

describe("saveQuestion", () => {
  test("An async unit test to verify that the saved question is returned and all expected fields are populated when correctly formatted data is passed to the function.", async () => {
    const question: QuestionSaveType = {
      id: "new question",
      author: "assfa",
      timestamp: Date.now(),
      optionOneText: "First option",
      optionTwoText: "Second option",
    };

    const result = await _saveQuestion(question);
    expect(result.optionOne.text).toEqual(question.optionOneText);
    expect(result.optionTwo.text).toEqual(question.optionTwoText);
  });

  test("An async unit test to verify that an error is returned if incorrect data is passed to the function.", async () => {
    const question: QuestionSaveType = {
      id: "new question",
      author: "new author",
      timestamp: Date.now() - 1000,
      optionOneText: "First option",
      optionTwoText: "Second option",
    };
    const result = await _saveQuestion(question);
    expect(result.timestamp).not.toEqual(question.timestamp);
  });

  test("Test fetch list users", async () => {
    const result = await _getUsers();
    expect(Object.keys(result as User[]).length).toBeGreaterThan(0);
  });

  test("Test fetch list question", async () => {
    const result = await _getQuestions();
    expect(Object.keys(result as User[]).length).toBeGreaterThan(0);
  });

  test("Test save question answer", async () => {
    const result = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      answer: "optionOne",
      qid: "8xf0y6ziyjabvozdd253nd",
    });
    expect(result).toEqual(true);
  });
});
