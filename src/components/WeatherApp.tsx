"use client";

import WeatherCard from "./WeatherInfo";
import NoWeatherReport from "./NoWeatherReport";
import getWeather from "@/ApiServices/getWeatherUpdates";
import React, { useEffect, useState } from "react";

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleGetWeather = async () => {
    setError("");
    setWeather(null);
    try {
      const response = await getWeather(city, latitude, longitude);
      if (response.error) {
        setError(response.message);
      } else {
        setWeather(response.data);
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const getDeviceLocation = () => {
    setCity("");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLongitude(position.coords.longitude.toString());
          setLatitude(position.coords.latitude.toString());
        },
        (error) => {
          setError("Error getting location: " + error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getDeviceLocation();
  }, []);

  return (
    <>
      <h1 className="text-4xl font-extrabold h-16 w-full text-left bg-gray-800 mb-6 p-3">
        <div className="ml-3 text-sky-300">Weather App</div>
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-20 w-full min-h-[80vh]">
        <div className="top-0 flex shadow-lg rounded-lg p-10 w-auto min-h-[80vh]">
          <div className="w-full min-h-full">
            <div className="mb-6">
              <label className="block text-blue-900 font-bold mb-2">City Name</label>
              <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setLatitude("");
                  setLongitude("");
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-blue-900 font-bold mb-2">Latitude</label>
                <input
                  type="text"
                  placeholder="Enter latitude"
                  value={latitude}
                  onChange={(e) => {
                    setLatitude(e.target.value);
                    setCity("");
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-blue-900 font-bold mb-2">Longitude</label>
                <input
                  type="text"
                  placeholder="Enter longitude"
                  value={longitude}
                  onChange={(e) => {
                    setLongitude(e.target.value);
                    setCity("");
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleGetWeather}
                className="px-6 py-2 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-900 transition"
              >
                Weather Report
              </button>
              <button
                onClick={getDeviceLocation}
                className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition"
              >
                Current Location
              </button>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 mt-4">Error: {error}</p>}

        <div className="w-[40%]">
          {weather ? <WeatherCard weather={weather} /> : <NoWeatherReport />}
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
