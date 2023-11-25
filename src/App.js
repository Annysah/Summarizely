import React from "react";
import Hero from "./components/Hero";
import Display from "./components/Display";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="main"></div>

      <div className="app">
        <Hero />
        <Display />
      </div>
    </>
  );
};

export default App;
