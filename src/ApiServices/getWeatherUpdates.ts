const getWeatherUpdates = async (
  city: string,
  latitude: string,
  longitude: string
) => {
  try {
    // Simulate a delay for a realistic user experience
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return dummy weather data
    return {
      error: false,
      message: "Weather successfully fetched",
      data: {
        city: city || "Dummy City",
        description: "Partly cloudy",
        humidity: 60,
        temperature: 25,
        maxTemperature: 30,
        minTemperature: 20,
        windSpeed: 10,
      },
    };
  } catch (error) {
    // Simulate an error response
    return Promise.reject({
      error: true,
      message: "Failed to fetch weather data",
    });
  }
};

export default getWeatherUpdates;
