import { it, expect } from "@jest/globals";
import { screen, render } from "@testing-library/react";
import News from "./News";

it('checks that "Search" is on the screen', () => {
  render(<News />);
  const h1 = screen.getByText(/Search/i);
  expect(h1).toBeInTheDocument();
});

it("checks that the input bar is on the screen", () => {
  render(<News />);
  const input = screen.getByPlaceholderText(/Search for news.../i);
  expect(input).toBeInTheDocument();
});
