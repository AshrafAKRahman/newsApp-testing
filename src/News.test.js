import React from "react";
import axios from "axios";
import { render, wait, fireEvent, screen } from "@testing-library/react";
import News from "./News";

jest.mock("axios");

describe("News component", () => {
  it("should fetch data from the API and render the articles", async () => {
    const articles = [
      {
        title: "Article 1",
        url: "https://example.com/article1",
        image: "https://example.com/article1.jpg",
      },
      {
        title: "Article 2",
        url: "https://example.com/article2",
        image: "https://example.com/article2.jpg",
      },
    ];

    axios.get.mockResolvedValue({ data: { articles } });

    const { getByPlaceholderText, getByText } = render(<News />);

    const input = screen.getByPlaceholderText("Search for news...");
    fireEvent.change(input, { target: { value: "search term" } });

    await wait(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "https://gnews.io/api/v3/search?q=search%20term&token=6685bb4be18ef8783cd335be48b1f2b7"
      );
    });

    articles.forEach((article) => {
      const title = screen.getByText(article.title);
      expect(title).toBeInTheDocument();
    });
  });
});
