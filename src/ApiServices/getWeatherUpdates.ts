// Function to fetch weather data from the API based on city, latitude, and longitude
const getWeatherUpdates = async (
  city: string,
  latitude: string,
  longitude: string
) => {
  try {
    // Make a request to the weather API with the provided city, latitude, and longitude
    const response = await fetch(`/api/weather?city=${city}&lat=${latitude}&lon=${longitude}`);
    
    // Check if the response is not ok (e.g., city not found)
    if (!response.ok) {
      throw new Error("City not found");
    }
    
    // Return the response data as JSON
    return response.json();
  } catch (error) {
    // If an error occurs, reject the promise with the error
    return Promise.reject(error);
  }
};

export default getWeatherUpdates;