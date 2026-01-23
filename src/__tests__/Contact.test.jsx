import { render, screen } from "@testing-library/react";
import Contact from "../components/Contact";
import "@testing-library/jest-dom";

test("loads the header", () => {
  // Rendering
  render(<Contact />);

  // Querying
  const header = screen.getByRole("heading");

  // Assertion
  expect(header).toBeInTheDocument();
});

test("loads the input text name", () => {
  render(<Contact />);
  const inputName = screen.getByPlaceholderText("name");
  expect(inputName).toBeInTheDocument();
});

test("loads the button", () => {
  render(<Contact />);
  const button = screen.getByText("Submit");
  expect(button).toBeInTheDocument();
});

test("page containing 2 input text boxes", () => {
  render(<Contact />);
  const inputBoxes = screen.getAllByRole("textbox");
  expect(inputBoxes.length).toBe(2);
  expect(inputBoxes.length).not.toBe(3);
});
