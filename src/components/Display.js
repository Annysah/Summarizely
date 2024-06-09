import React, { useState, useEffect } from "react";

import { loader } from "../assets";

import { useLazyGetSummaryQuery } from "../services/article";

const Display = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDelete = (index) => {
    const updatedArticles = [...allArticles];
    updatedArticles.splice(index, 1);
    
    setAllArticles(updatedArticles);
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
  };
  
  return (
    <>
      <section className="mt-16 w-full max-w-xl">
        <div className="flex flex-col w-full gap-2">
          <form
            className="relative flex justify-center items-center"
            onSubmit={handleSubmit}
          >
            <span className="absolute left-0 my-2 ml-3 w-5"><i className="fa-solid fa-link"></i></span>
            <input
              className="url_input peer"
              id="url"
              type="url"
              placeholder="Enter a URL"
              value={article.url}
              required
              onChange={(e) => {
                setArticle({
                  ...article,
                  url: e.target.value,
                });
              }}
            />
            <button
              className="submit_btn peer-focus:border-cyan-600 peer-focus:text-gray-700"
              type="submit"
            >
              <p>↵</p>
            </button>
          </form>

          <div className="link_card mt-12">
            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
              <h2 className="font-inter font-bold text-black text-2xl">
                Article <span className="blue_gradient">History</span>
              </h2>
              {allArticles.reverse().map((item, index) => (
                <div
                  key={`link-${index}`}
                  onClick={() => setArticle(item)}
                  className="link_card my-4"
                >
                  <div
                    className="copy_btn"
                    onClick={() => handleCopy(item.url)}
                  >
                    <img
                      src={copied === item.url ? <i className="fa-solid fa-check"></i> : <i className="fa-regular fa-copy"></i>}
                      alt="Copy Icon"
                      className="w-[40%] h-[40%] object-contain"
                    />
                  </div>
                  <p className="flex-1 font-poppins text-blue-700 font-medium text-sm truncate">
                    {item.url}
                  </p>
                  <button
                    className="black_btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? (
            <img
              src={loader}
              alt="loader"
              className="w-20 h-20 object-contain"
            />
          ) : error ? (
            <p className="font-inter font-bold text-black text-center">
              Well, that wasn't supposed to happen...
              <br />
              <span className="font-inter text-black">
                {error?.data?.error}
              </span>
            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3">
                <h2 className="font-inter font-bold text-black text-2xl">
                  Article <span className="blue_gradient">Summary</span>
                </h2>
                <div className="summary_box">
                  <p className="font-inter leading-7 text-sm text-gray-800">
                    {article.summary}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default Display;
