import React from "react";
import { useWeatherContext } from "../context";
import { getWeekday, getCurrentHoursMins } from "../util";

const Current = () => {
  const { weather, degree, setDegree } = useWeatherContext();

  const {
    location,
    current: { condition },
    current,
  } = weather;

  let feelslike = degree === "c" ? `${current.feelslike_c} ℃` : `${current.feelslike_f} °F`;
  let temp = degree === "c" ? current.temp_c : current.temp_f;

  return (
    <section className="current-section">
      <h2>
        {location.name}, {location.country}
      </h2>
      <h3>{`${getWeekday()} ${getCurrentHoursMins()}`}</h3>
      <small>last updated: {current.last_updated.slice(-5)}</small>
      <div className="curr-temp-container">
        <div className="curr-temperature">
          <img src={condition.icon} alt={condition.text} className="card card-pr" />
          <div className="temp">
            <h1>{temp}°</h1>
            <div className="degrees">
              <h3
                className={degree === "c" ? `degree active degree-top` : `degree degree-top`}
                onClick={() => setDegree("c")}
              >
                C
              </h3>
              <h3
                className={degree === "f" ? `degree active` : `degree`}
                onClick={() => setDegree("f")}
              >
                F
              </h3>
            </div>
          </div>
        </div>
      </div>
      <h4>{condition.text}</h4>
      <h4>
        feels like: <span>{feelslike}</span>
      </h4>
    </section>
  );
};

export default Current;
