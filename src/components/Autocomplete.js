import React, { useState, useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useWeatherContext } from "../context";

const Autocomplete = () => {
  const { text, setText, searchList, setQuery, setIsSuggestionText } = useWeatherContext();
  const [active, setActive] = useState(-1);
  //for resetting to the text value to user input after returning from suggestions
  const [oldText, setOldText] = useState("");

  useEffect(() => {
    if (searchList.length > 0) {
      setIsSuggestionText(true);
      if (active < 0 && searchList.length > 0) {
        setText(oldText);
      } else {
        setText(searchList.filter((item, index) => active === index)[0].name);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const submit = query => {
    setQuery(query);
    setText("");
    setOldText("");
    setActive(-1);
    setIsSuggestionText(false);
  };

  //submit the form with the value of the user input
  const submitSearch = e => {
    e.preventDefault();
    submit(text);
  };

  //submit the form with the value of a suggestion
  const submitSuggestion = e => {
    submit(e.currentTarget.innerText);
  };

  //handle up and down keys press
  const handleKeyDown = e => {
    if (e.keyCode === 38) {
      setActive(() => {
        let newActive = active - 1;
        if (newActive < -1) {
          newActive = -1;
        }
        return newActive;
      });
    } else if (e.keyCode === 40) {
      setActive(() => {
        let newActive = active + 1;
        if (newActive > searchList.length - 1) {
          newActive = searchList.length - 1;
        }
        return newActive;
      });
    }
  };

  return (
    <form className="search-form" onSubmit={submitSearch}>
      <input
        className="search-input"
        type="text"
        placeholder="search location, postcode"
        value={text}
        onChange={e => {
          setIsSuggestionText(false);
          setText(e.target.value);
          setOldText(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      {searchList.length > 0 && (
        <ul className="suggestions">
          {searchList.map((item, index) => {
            return (
              <li
                key={item.id}
                onClick={submitSuggestion}
                className={active === index ? "active" : null}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      )}

      <button type="submit" className="search-btn btn">
        <BiSearchAlt className="icon" />
      </button>
    </form>
  );
};

export default Autocomplete;
