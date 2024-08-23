import "@testing-library/jest-dom";
import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from "@/lib/_DATA";
import { expect, describe } from "@jest/globals";
import { User } from "@/types/entities.type";

type QuestionSaveType = {
  id: string;
  author: string;
  timestamp: number;
  optionOneText: string;
  optionTwoText: string;
};

describe("saveQuestion", () => {
  jest.setTimeout(10000);
  it("An async unit test to verify that the saved question is returned and all expected fields are populated when correctly formatted data is passed to the function.", async () => {
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

  it("An async unit test to verify that an error is returned if incorrect data is passed to the function.", async () => {
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

  it("Test fetch list users", async () => {
    const result = await _getUsers();
    expect(Object.keys(result as User[]).length).toBeGreaterThan(0);
  });

  it("Test fetch list question", async () => {
    const result = await _getQuestions();
    expect(Object.keys(result as User[]).length).toBeGreaterThan(0);
  });

  it("Test save question answer", async () => {
    const result = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      answer: "optionOne",
      qid: "8xf0y6ziyjabvozdd253nd",
    });
    expect(result).toEqual(true);
  });

  it("should throw an error if required fields are missing in _saveQuestion", async () => {
    const question = {
      optionOneText: "",
      optionTwoText: "Option Two Text",
      author: "sarahedo",
    };

    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
  it("should throw an error if required fields are missing in _saveQuestionAnswer", async () => {
    const answer: {
      authedUser: string;
      qid: string;
      answer: "optionOne" | "optionTwo";
    } = {
      authedUser: "",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    };

    await expect(_saveQuestionAnswer(answer)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
  // Snapshot test
  it("should match the snapshot for users", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const users: any = await _getUsers();
    expect(users.sarahedo.name).toMatchSnapshot();
  });
});
