import React from "react";
import logo from "../assets/logo.svg";
import ColorSwitch from "./ColorSwitch";
import Autocomplete from "./Autocomplete";

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <img src={logo} alt="weather app" className="logo" />
        <Autocomplete />
        <ColorSwitch />
      </div>
    </header>
  );
};

export default Header;
