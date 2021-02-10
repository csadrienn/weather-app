import React, { useEffect, useState } from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import { useWeatherContext } from "../context";
import { splitArray } from "../util";
import { Swipeable } from "react-touch";

const Hours = () => {
  const { activeDay, setActiveHour, activeHour, degree } = useWeatherContext();
  const [index, setIndex] = useState(0);
  const [hoursPerSlider, setHoursPerSlider] = useState(window.innerWidth > 800 ? 6 : 3);

  // set the number of visible cards in the slider depending on the window width
  useEffect(() => {
    const updateHoursPerSlider = () => {
      if (window.innerWidth >= 800 && hoursPerSlider !== 6) {
        setHoursPerSlider(6);
      }

      if (window.innerWidth < 800 && hoursPerSlider !== 3) {
        setHoursPerSlider(3);
      }
    };
    window.addEventListener("resize", updateHoursPerSlider);
    return () => window.removeEventListener("resize", updateHoursPerSlider);
  });

  //set the index of the visible slider part
  useEffect(() => {
    // if the current day is selected set the index of the part with the current hour
    const activeDate = new Date(activeDay.date);
    const currentDate = new Date();
    if (activeDate.getDate() === currentDate.getDate()) {
      const currentHour = currentDate.getHours();
      const i = Math.floor(currentHour / hoursPerSlider);
      setIndex(i);
    } else {
      //else set the first part
      setIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDay]);

  //handle caret button clicks
  const handleCaretClick = dir => {
    const splitHours = splitArray(activeDay.hour, hoursPerSlider);
    //decrease the index by one and set the part's first hour as active
    if (dir === "prev") {
      let newIndex = index - 1;
      newIndex = newIndex < 0 ? 0 : newIndex;
      setIndex(newIndex);
      setActiveHour(splitHours[newIndex][0]);
    }
    //increase the index by one and set the part's first hour as active
    if (dir === "next") {
      let newIndex = index + 1;
      newIndex = newIndex > splitHours.length - 1 ? splitHours.length - 1 : newIndex;
      setIndex(newIndex);
      setActiveHour(splitHours[newIndex][0]);
    }
  };

  // split the hours array into array of arrays
  const splitHours = splitArray([...activeDay.hour], hoursPerSlider);
  const movement = 100 * index;

  return (
    <article className="hours">
      <button
        type="button"
        className="caret-btn prev-btn btn"
        onClick={() => handleCaretClick("prev")}
        disabled={index === 0}
      >
        <BsCaretLeftFill className="icon" />
      </button>
      <Swipeable
        onSwipeLeft={() => handleCaretClick("prev")}
        onSwipeRight={() => handleCaretClick("next")}
      >
        <div className="slider-container">
          {splitHours.map((hoursChunk, chunkIndex) => {
            //return the visible div container of the hours
            return (
              <div
                key={chunkIndex}
                className="slider"
                style={{ transform: `translateX(-${movement}%)` }}
              >
                {hoursChunk.map(hour => {
                  const { time_epoch, time, temp_c, temp_f, condition } = hour;
                  let temp = degree === "c" ? `${temp_c} ℃` : `${temp_f} °F`;
                  // if the hour has passed add past to classes
                  const activeDate = new Date(activeDay.date).getDate();
                  const currentDate = new Date().getDate();
                  const TimeDiff = new Date().getHours() - new Date(hour.time).getHours();
                  let past = "";
                  if (activeDate === currentDate && TimeDiff > 0) {
                    past = "past";
                  }
                  //return the hour cards
                  return (
                    <div
                      className="slider-item"
                      key={time_epoch}
                      style={{ minWidth: `${100 / hoursPerSlider}%` }}
                    >
                      <div
                        className={
                          activeHour.time_epoch === hour.time_epoch
                            ? `card card-sec ${past} active`
                            : `card card-sec ${past}`
                        }
                        onClick={() => setActiveHour(hour)}
                      >
                        <p>{time.slice(-5)}</p>
                        <img src={condition.icon} alt={condition.text} />
                        <p>
                          <span>{temp}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </Swipeable>

      <button
        type="button"
        className="caret-btn next-btn btn"
        onClick={() => handleCaretClick("next")}
        disabled={index === splitHours.length - 1}
      >
        <BsCaretRightFill className="icon" />
      </button>
    </article>
  );
};

export default Hours;
