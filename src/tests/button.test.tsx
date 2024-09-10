import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/button";
describe("Button Component", () => {
  it("should render the button with the correct text", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("should apply the correct variant class", () => {
    render(<Button variant="destructive">Destructive Button</Button>);
    const buttonElement = screen.getByText(/destructive button/i);
    expect(buttonElement).toHaveClass("bg-destructive");
  });

  it("should call onClick when the button is clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should apply additional class names", () => {
    render(<Button className="extra-class">Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toHaveClass("extra-class");
  });
});
