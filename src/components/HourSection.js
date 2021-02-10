import React from "react";
import Hours from "./Hours";
import Details from "./Details";
import { useWeatherContext } from "../context";

const HourSection = () => {
  const { activeHour: hour } = useWeatherContext();

  const details = [
    { name: "humidity", value: `${hour.humidity} %` },
    { name: "windSpeed", value: `${hour.wind_kph} km/h` },
    { name: "windDir", value: hour.wind_dir },
    { name: "cloud", value: `${hour.cloud} %` },
    { name: "uv", value: hour.uv },
    { name: "visibility", value: `${hour.vis_km} km` },
    { name: "pressure", value: `${hour.pressure_mb} mb` },
  ];
  let precip =
    Number(hour.chance_of_snow) > 0
      ? { name: "snow", value: `${hour.chance_of_snow} %` }
      : { name: "rain", value: `${hour.chance_of_rain} %` };

  details.unshift(precip);

  // if the hour has passed add past to parentname to set as a class
  const activeDate = new Date(hour.time).getDate();
  const currentDate = new Date().getDate();
  const TimeDiff = new Date().getHours() - new Date(hour.time).getHours();

  let past = "";
  if (activeDate === currentDate && TimeDiff > 0) {
    past = "past ";
  }

  return (
    <section className="hours-section">
      <Hours />
      <Details parentName={`${past}hour`} details={details} />
    </section>
  );
};

export default HourSection;
