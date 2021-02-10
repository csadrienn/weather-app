import React from "react";
import { useWeatherContext } from "../context";
import { formDayAndDate } from "../util";
import Details from "./Details";

const Days = ({ details }) => {
  const { weather, setActiveDay, activeDay, degree } = useWeatherContext();
  const { forecastday: forcastDays } = weather.forecast;

  return (
    <article className="days">
      {forcastDays.map(day => {
        const {
          date_epoch,
          date,
          day: { condition, avgtemp_c, avgtemp_f },
        } = day;
        let temp = degree === "c" ? `${avgtemp_c} ℃` : `${avgtemp_f} °F`;

        return (
          <div
            className={
              date_epoch === activeDay.date_epoch ? "active card-wrapper" : "card card-wrapper"
            }
            key={date_epoch}
          >
            <div className="card card-pr day" onClick={() => setActiveDay(day)}>
              <p>{formDayAndDate(date)}</p>
              <img src={condition.icon} alt={condition.text} />
              <h4>{temp}</h4>
            </div>
            <Details details={details} parentName="mobile-day" />
          </div>
        );
      })}
    </article>
  );
};

export default Days;
