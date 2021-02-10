//create an array on arrays where the subarrays have a specified length
export const splitArray = (array, stop) => {
  const wholeArray = [...array];
  const split = [];
  while (wholeArray.length) {
    split.push(wholeArray.splice(0, stop));
  }
  return split;
};

export const getWeekday = (day, short = false) => {
  if (!day) {
    day = new Date().getDay();
  }
  let weekDay = "";
  switch (day) {
    case 0:
      weekDay = short ? "Sun" : "Sunday";
      return weekDay;
    case 1:
      weekDay = short ? "Mon" : "Monday";
      return weekDay;
    case 2:
      weekDay = short ? "Tue" : "Tuesday";
      return weekDay;
    case 3:
      weekDay = short ? "Wed" : "Wednesday";
      return weekDay;
    case 4:
      weekDay = short ? "Thu" : "Thursday";
      return weekDay;
    case 5:
      weekDay = short ? "Fri" : "Friday";
      return weekDay;
    case 6:
      weekDay = short ? "Sat" : "Saturday";
      return weekDay;
    default:
      return;
  }
};

export const getCurrentHoursMins = () => {
  const date = new Date();
  let hour = date.getHours().toString();
  hour = hour.length === 1 ? `0${hour}` : hour;
  let minute = date.getMinutes().toString();
  minute = minute.length === 1 ? `0${minute}` : minute;
  return `${hour}:${minute}`;
};

export const formDayAndDate = dateEpoch => {
  const date = new Date(dateEpoch);
  const weekday = getWeekday(date.getDay(), true);
  let day = date.getDate().toString();
  day = day.length === 1 ? `0${day}` : day;

  return `${weekday.toUpperCase()} ${day}`;
};
