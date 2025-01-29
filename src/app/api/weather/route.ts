import { NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export async function GET(req: Request) {
  const url = req.url ?? "";

  // Extract query parameters from the request URL
  const params = new URLSearchParams(new URL(url).search);
  const city = params.get("city");
  const latitude = params.get("lat");
  const longitude = params.get("lon");

  // Validate input: ensure either city or both latitude and longitude are provided
  if ((!city || city === "") && ((!latitude || latitude === "") || (!longitude || longitude === ""))) {
    return NextResponse.json({
      error: true,
      message: "Invalid Input: Please enter a valid city name or provide latitude and longitude",
    });
  }

  try {
    // Fetch weather data from the OpenWeatherMap API
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`);

    // Check if the API response is not ok (e.g., city not found)
    if (!weather.ok) {
      return NextResponse.json({
        error: true,
        message: `Weather : ${weather.statusText} - Please enter a valid city name or provide latitude and longitude`,
      });
    }

    // Parse the response data as JSON
    const data = await weather.json();
    const weatherData = {
      city: data.name,
      description: data.weather[0]?.description || 'Not available',
      humidity: data.main.humidity,
      temperature: data.main.temp,
      maxTemperature: data.main.temp_max,
      minTemperature: data.main.temp_min,
      windSpeed: data.wind.speed,
    };

    // Return the weather data as a JSON response
    return NextResponse.json({
      error: false,
      message: "Weather successfully fetched",
      data: weatherData,
    });

  } catch (error) {
    // Handle any errors that occur during the fetch operation
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({
      error: true,
      message: errorMessage,
      status: 500
    });
  }
}