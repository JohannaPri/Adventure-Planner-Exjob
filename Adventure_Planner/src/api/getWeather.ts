import axios from "axios";
const apiKey = import.meta.env.VITE_OPEN_WEATHER_KEY;

interface WeatherQuery {
  destination: string;
}

const fetchWeatherData = async (query: WeatherQuery) => {
  const { destination } = query;
  console.log("Fetching weather with query: ", query);

  try {
    const response = await axios.get(
      `https://m2.eeazy.se/rapapi/weather/search?city=${destination}&apikey=${apiKey}&units=metric`
    );
    console.log("API RESPONSE: ", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch weather data"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export default fetchWeatherData;
