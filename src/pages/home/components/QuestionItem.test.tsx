import QuestionItem from "@/pages/home/components/QuestionItem";
import { describe, expect, test } from "@jest/globals";
import { render } from "@testing-library/react";

describe("QuestionItem", () => {
  test("matches the snapshots when a question is passed", () => {
    const { asFragment } = render(
      <QuestionItem
        data={{
          id: "abc",
          author: "sarahedo",
          timestamp: Date.now(),
          optionOne: {
            votes: ["sarahedo"],
            text: "Build our new application with Javascript",
          },
          optionTwo: {
            votes: [],
            text: "Build our new application with Typescript",
          },
        }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches the snapshots when a question is passed", () => {
    const { asFragment } = render(<QuestionItem />);
    expect(asFragment()).toMatchSnapshot();
  });
});
