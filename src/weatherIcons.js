import React from "react";
import { WiHumidity, WiBarometer, WiCloudy } from "react-icons/wi";
import { TiEye } from "react-icons/ti";
import {
  GiWindTurbine,
  GiSunRadiations,
  GiWaterDrop,
  GiSnowflake2,
  GiWindsock,
  GiSunrise,
  GiSunset,
} from "react-icons/gi";

export const icons = {
  windSpeed: <GiWindTurbine className="icon wi-icon" />,
  uv: <GiSunRadiations className="icon" />,
  rain: <GiWaterDrop className="icon" />,
  snow: <GiSnowflake2 className="icon" />,
  windDir: <GiWindsock className="icon" />,
  visibility: <TiEye className="icon" />,
  humidity: <WiHumidity className="icon wi-icon" />,
  pressure: <WiBarometer className="icon wi-icon" />,
  cloud: <WiCloudy className="icon wi-icon" />,
  sunrise: <GiSunrise className="icon" />,
  sunset: <GiSunset className="icon" />,
};
