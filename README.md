# Flowork AI - Weather App Assignment

> - **Deployed Weather App:** [Live Demo](https://weather-app-nextjs-mauve.vercel.app/)

## Installation & Running the Application

Follow the steps below to set up and run the weather application on your local machine.

### Prerequisites

Ensure you have the following installed:

1. **Node.js**
   - Required Version: `>=16.x` (Refer to `package.json` under `engines` for exact specifications)

2. **npm** (Included with Node.js installation)
   - Required Version: `>=8.x`

### Installation & Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-application
   ```
3. Create a `.env` file in the root directory and add your OpenWeather API key:
   ```bash
   NEXT_PUBLIC_WEATHER_API_KEY=Your_Open_Weather_Api_Key
   ```
4. Install the necessary dependencies:
   ```bash
   npm install
   ```

## Running the Application

To start the development server, execute the following command:
```bash
npm run dev
```
Once running, you can access the application at [http://localhost:3000](http://localhost:3000).

## Running Tests

To ensure the application's reliability, unit tests are included for both the frontend and backend.

### Frontend Testing:
```bash
cd weather-application
npm run test __test__/weather.test.tsx
```

### Backend Testing:
```bash
cd weather-application
npm run test __test__/weatherApi.test.tsx
```

## About the Weather App

### Overview

- **Objective:** This real-time weather app provides users with up-to-date weather information for any city worldwide.
- **Technology Stack:** Built using Next.js for the frontend and Node.js/Express for the backend, ensuring fast and efficient performance.
- **Key Features:**
  - Simple interface for searching weather details by city name or geographical coordinates (latitude/longitude).
  - Displays essential weather metrics: temperature, humidity, wind speed, and a brief weather description.
  - Fetches real-time weather data from the OpenWeatherMap API.

### Error Handling

- Provides clear error messages for incorrect city names or failed API requests.
- Handles network or API errors gracefully to maintain seamless functionality.

### Testing & Reliability

- Comprehensive unit tests using Jest to ensure the application functions correctly and remains maintainable.

---

This README provides all the necessary details to set up, run, and understand the features of the Weather App. Enjoy coding!
