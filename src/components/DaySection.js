import React from "react";
import Days from "./Days";
import Details from "./Details";
import { useWeatherContext } from "../context";

const DaySection = () => {
  const { activeDay } = useWeatherContext();

  const { day, astro } = activeDay;
  const details = [
    { name: "humidity", value: `${day.avghumidity} %` },
    { name: "uv", value: day.uv },
    { name: "windSpeed", value: `${day.maxwind_kph} km/h` },
    { name: "sunrise", value: astro.sunrise },
    { name: "sunset", value: astro.sunset },
  ];
  let precip =
    Number(day.daily_chance_of_snow) > 0
      ? { name: "snow", value: `${day.daily_chance_of_snow} %` }
      : { name: "rain", value: `${day.daily_chance_of_rain} %` };

  details.unshift(precip);

  return (
    <section className="days-section">
      <Days details={details} />
      <Details details={details} parentName="day" />
    </section>
  );
};

export default DaySection;
