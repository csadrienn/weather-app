import React from "react";
import spinner from "../assets/spinner.svg";

const Loading = () => {
  return (
    <main className="loading">
      <img src={spinner} alt="loading" />
    </main>
  );
};

export default Loading;
