import { expect, test, describe } from "@jest/globals";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import QuestionList from "./QuestionList";

describe("QuestionList", () => {
  test("matches the snapshots when a question list is passed", async () => {
    const { asFragment } = render(
      <MemoryRouter>
        <QuestionList
          data={[
            {
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
            },
            {
              id: "abcs",
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
            },
          ]}
        />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("matches the snapshots when a question list is passed", async () => {
    const { asFragment } = render(
      <MemoryRouter>
        <QuestionList />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
