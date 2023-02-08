import axios from "axios";
import React, { useEffect, useState } from "react";
import "./News.css";

/**
 * API key for the GNews API
 */
const API_KEY = "6685bb4be18ef8783cd335be48b1f2b7";

/**
 * Main component that renders the GNews search interface
 */
const News = () => {
  /**
   * State for the search term, initialized to an empty string
   */
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * State for the articles returned from the search, initialized to an empty array
   */
  const [articles, setArticles] = useState([]);

  /**
   * useEffect hook to perform a search when the search term changes
   *
   * Debounces the fetchData function to limit the frequency at which the API is called
   */
  useEffect(() => {
    let debounceTimer;

    /**
     * Async function to fetch data from the GNews API
     */
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://gnews.io/api/v3/search?q=${searchTerm}&token=${API_KEY}`
        );
        setArticles(result.data.articles);
      } catch (error) {
        console.log(error);
      }
    };

    /**
     * Clear the previous debounce timer and set a new one for the fetchData function
     */
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      fetchData();
    }, 1000);

    /**
     * Clean up the debounce timer when the component unmounts
     */
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm]);

  /**
   * Render the GNews search interface
   */
  return (
    <div>
      <div className="title-box">
        <h1>GNews Search</h1>
        <input
          className="input-box"
          type="text"
          placeholder="Search for news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="articles-container">
        {articles.map((article) => (
          <div key={article.title} className="article-box">
            <img
              src={article.image}
              alt={article.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://i.imgur.com/MM76F2o.png";
              }}
            />
            <a href={article.url} target="blank">
              {article.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
export default News;
