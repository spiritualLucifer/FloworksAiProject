'use client'
import React from "react";
import { useState, useEffect } from 'react'
import {
  FaTemperatureHigh,
  FaTemperatureLow,
  FaWind,
  FaTint,
} from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";
import {
  WiDaySunny,
  WiCloudy,
  WiRainWind,
  WiCloudyGusts,
} from "react-icons/wi";

 

// Define the props interface for the WeatherCard component
interface WeatherProps {
  weather: {
    city: string;
    description: string;
    humidity: string;
    temperature: string;
    maxTemperature: string;
    minTemperature: string;
    windSpeed: string;
  };
}

// WeatherCard component to display weather information
const WeatherInfo: React.FC<WeatherProps> = ({ weather }) => {
  const [isClient, setIsClient] = useState<boolean>(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
   
  if(!isClient)return <h1>Not Perfect Render</h1>;
  
  return (
    <div className="p-6 w-full min-h-[80vh] bg-gradient-to-br from-blue-500 to-indigo-900 rounded-lg shadow-lg text-white">
      <div className="text-center flex flex-wrap items-center justify-around gap-5">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <MdLocationCity className="text-5xl" /> {/* City icon */}
          <h2 className="text-5xl font-semibold">{weather.city}</h2>
          {/* City name */}
        </div>
        <div className="flex justify-between items-center gap-4">
          <div>
            {/* Display appropriate weather icon based on description */}
            {weather.description.toLowerCase().includes("sun") ? (
              <WiDaySunny className="text-7xl mx-auto" />
            ) : weather.description.toLowerCase().includes("cloud") ? (
              <WiCloudy className="text-7xl mx-auto" />
            ) : weather.description.toLowerCase().includes("rain") ? (
              <WiRainWind className="text-7xl mx-auto" />
            ) : (
              <WiCloudyGusts className="text-7xl mx-auto" />
            )}
            <p className="capitalize mt-2 text-xl">{weather.description}</p>
            {/* Weather description */}
          </div>
          <div>
            <div className="mt-4 text-center">
              <p className="text-5xl font-bold">
                {Math.round(Number(weather.temperature))}°C{" "}
                {/* Current temperature */}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-5 space-y-4">
              <FaTemperatureHigh className="text-4xl" /> {/* High temperature icon */}
              <p className="text-3xl">
                <span className="font-bold">High :</span> {Math.round(Number(weather.maxTemperature))}°C{" "}
                {/* Max temperature */}
              </p>
            </div>
            <div className="flex items-center space-x-5 space-y-4">
              <FaTemperatureLow className="text-4xl" /> {/* Low temperature icon */}
              <p className="text-3xl">
                <span className="font-bold">Low :</span> {Math.round(Number(weather.minTemperature))}°C{" "}
                {/* Min temperature */}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start space-y-2">
            <div className="flex items-center space-x-4 space-y-4">
              <FaTint className="text-4xl" /> {/* Humidity icon */}
              <p className="text-3xl"> 
                <span className="font-bold">Humidity :</span> {weather.humidity}%{" "}
                {/* Humidity */}
              </p>
            </div>
            <div className="flex items-center space-x-4 space-y-4">
              <FaWind className="text-4xl" /> {/* Wind speed icon */}
              <p className="text-3xl">
                <span className="font-bold">Wind :</span> {weather.windSpeed} km/h{" "}
                {/* Wind speed */}
              </p>
            </div>
          </div>
        </div>

      <div className="flex flex-row gap-x-10 justify-around">
          <img src="/no_report_cloud.png" alt="" className="w-48"/>
          {/* <img src="/no_report_cloud4.png" alt="" className="w-48"/> */}

      </div>
      <p className="text-center text-lg">{new Date().toLocaleString()}</p>{" "}
      {/* Current date and time */}
    </div>
  );
};

export default WeatherInfo;
