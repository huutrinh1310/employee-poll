import { expect, test, describe } from "@jest/globals";
import { render } from "@testing-library/react";
import QuestionItem from "@/pages/home/components/QuestionItem";
import { MemoryRouter } from "react-router-dom";

describe("QuestionItem", () => {
  test("matches the snapshots when a question is passed", () => {
    const { asFragment } = render(
      <MemoryRouter>
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
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches the snapshots when a question is passed", () => {
    const { asFragment } = render(
      <MemoryRouter>
        <QuestionItem />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
