import React, { useState, useEffect } from "react";
import { GiPlainCircle } from "react-icons/gi";

const getStorageTheme = () => {
  let theme = "light-theme";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

const ColorSwitch = () => {
  const [theme, setTheme] = useState(getStorageTheme());

  const toggleTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };

  //get the theme from local storage and set it
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="color-control">
      <span>light</span>
      <button
        type="button"
        className={
          theme === "light-theme" ? "color-switch-btn btn light" : "color-switch-btn btn dark"
        }
        onClick={toggleTheme}
      >
        <GiPlainCircle className="icon" />
      </button>
      <span>dark</span>
    </div>
  );
};

export default ColorSwitch;
