import getWeatherUpdates from '@/ApiServices/getWeatherUpdates';

global.fetch = jest.fn();

describe('getWeatherUpdates Function', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should successfully fetch weather data when all parameters are provided', async () => {
    // Mock the successful response data
    const mockWeatherData = {
      error: false,
      message: "Weather successfully fetched",
      data: {
        city: "London",
        description: "cloudy",
        humidity: "80",
        temperature: "15",
        maxTemperature: "18",
        minTemperature: "12",
        windSpeed: "5.5"
      }
    };

    // Mock the fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockWeatherData)
    });

    const result = await getWeatherUpdates("London", "51.5074", "-0.1278");

    // Verify the fetch was called with correct parameters
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/weather?city=London&lat=51.5074&lon=-0.1278"
    );

    // Verify the returned data matches our mock
    expect(result).toEqual(mockWeatherData);
  });

  it('should handle API error responses', async () => {
    // Mock an error response from the API
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });

    await expect(getWeatherUpdates("NonExistentCity", "", ""))
      .rejects
      .toThrow("City not found");

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/weather?city=NonExistentCity&lat=&lon="
    );
  });

  it('should handle network errors', async () => {
    // Mock a network error
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    await expect(getWeatherUpdates("London", "", ""))
      .rejects
      .toThrow("Network error");

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/weather?city=London&lat=&lon="
    );
  });

  it('should work with only coordinates provided', async () => {
    const mockWeatherData = {
      error: false,
      message: "Weather successfully fetched",
      data: {
        city: "Paris",
        description: "sunny",
        humidity: "65",
        temperature: "22",
        maxTemperature: "25",
        minTemperature: "19",
        windSpeed: "3.2"
      }
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockWeatherData)
    });

    const result = await getWeatherUpdates("", "48.8566", "2.3522");

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/weather?city=&lat=48.8566&lon=2.3522"
    );
    expect(result).toEqual(mockWeatherData);
  });

  it('should handle malformed JSON response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.reject(new Error("Invalid JSON"))
    });

    await expect(getWeatherUpdates("London", "", ""))
      .rejects
      .toThrow("Invalid JSON");
  });

  it('should make request with empty parameters if not provided', async () => {
    const mockWeatherData = {
      error: true,
      message: "Invalid Input: Please enter a valid city name or provide latitude and longitude"
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockWeatherData)
    });

    const result = await getWeatherUpdates("", "", "");

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/weather?city=&lat=&lon="
    );
    expect(result).toEqual(mockWeatherData);
  });
});