import { it, expect } from "@jest/globals";
import { screen, render } from "@testing-library/react";
import News from "./News";

it('checks that "Search" is on the screen', () => {
  render(<News />);
  const h1 = screen.getByText(/Search/i);
  expect(h1).toBeInTheDocument();
});
