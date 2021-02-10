import React, { useContext, useState, useEffect } from "react";

const WeatherContext = React.createContext();
const baseUrl = "https://api.weatherapi.com/v1";
const autocomp = "/search.json";
const forecast = "/forecast.json";

let key = process.env.REACT_APP_KEY;

if (process.env.NODE_ENV === "production") {
  key = process.env.REACT_APP_KEY;
}

const getStorageQuery = () => {
  let query = "London";
  if (localStorage.getItem("query")) {
    query = localStorage.getItem("query");
  }
  return query;
};

const WeatherProvider = ({ children }) => {
  //state variables for displaying the weather
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: false, msg: "" });
  const [weather, setWeather] = useState(null);
  const [activeDay, setActiveDay] = useState(null);
  const [activeHour, setActiveHour] = useState(null);
  const [degree, setDegree] = useState("c");

  //state variables for input and suggestions
  const [query, setQuery] = useState(getStorageQuery());
  const [text, setText] = useState("");
  const [isSuggestionText, setIsSuggestionText] = useState(false);
  const [searchList, setSearchList] = useState([]);

  // getting suggestions
  useEffect(() => {
    const fetchAutocomplate = async () => {
      const url = `${baseUrl}${autocomp}?key=${key}&q=${text}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setSearchList(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (!isSuggestionText) {
      if (text.length >= 3) {
        fetchAutocomplate();
      } else {
        setSearchList([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  //fetching weather with a given query
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(false);
      const url = `${baseUrl}${forecast}?key=${key}&q=${query}&days=3`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data);
        setActiveDay(data.forecast.forecastday[0]);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError({ error: true, msg: "Ooops, something went wrong" });
        setLoading(false);
      }
    };

    if (query !== "") {
      fetchWeather();
      localStorage.setItem("query", query);
    }
  }, [query]);

  //setting active hour
  useEffect(() => {
    if (activeDay) {
      //if this is the current day set the actual hour
      const activeDate = new Date(activeDay.date);
      const currentDate = new Date();
      if (activeDate.getDate() === currentDate.getDate()) {
        const currentHour = currentDate.getHours();
        setActiveHour(activeDay.hour[currentHour]);
      } else {
        //if not the current day set the first hour
        setActiveHour(activeDay.hour[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDay]);

  return (
    <WeatherContext.Provider
      value={{
        loading,
        error,
        weather,
        activeDay,
        setActiveDay,
        activeHour,
        setActiveHour,
        setQuery,
        text,
        setText,
        searchList,
        setSearchList,
        setIsSuggestionText,
        isSuggestionText,
        degree,
        setDegree,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

const useWeatherContext = () => {
  return useContext(WeatherContext);
};

export { WeatherProvider, useWeatherContext };
