import React from "react";

const Hero = () => {
  return (
    <>
      <header className="w-full flex justify-center items-center flex-col">
        <nav className="flex justify-between items-center w-full mb-10 pt-3">
          <h1 className="font-bold text-3xl blue_gradient">Summarisely</h1>

          <button
            className="black_btn"
            type="button"
            onClick={() => window.open("https://github.com/Annysah")}
          >
            Star on Github <i className="fa fa-star"></i>
          </button>
        </nav>

        <h1 className="head_text">
          Summarize Articles with <br className="max-md:hidden" />{" "}
          <span className="blue_gradient">OpenAI GPT-4</span>
        </h1>
        <h2 className="description">
          Summarize the complexity, amplify your understanding – Summarizely,
          your gateway to instant, insightful article summaries
        </h2>
      </header>
    </>
  );
};

export default Hero;
