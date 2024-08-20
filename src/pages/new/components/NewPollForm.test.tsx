import { expect, test, describe } from "@jest/globals";
import { render, fireEvent } from "@testing-library/react";
import NewPollForm from "./NewPollForm";

describe("New Poll Form", () => {
  test("Will display an invalid message when the first option is less than 2 characters", () => {
    const component = render(<NewPollForm onSubmit={jest.fn()} />);

    const firstOptionInput = component.getByTestId("first-text");
    const secondOptionInput = component.getByTestId("second-text");
    const submitButton = component.getByTestId("submit-button");

    fireEvent.change(firstOptionInput, { target: { value: "ass" } });
    fireEvent.change(secondOptionInput, { target: { value: "bf" } });

    fireEvent.click(submitButton);

    expect(firstOptionInput.getAttribute("value")).toEqual("ass");
    expect(secondOptionInput.getAttribute("value")).toEqual("bf");
  });
});
