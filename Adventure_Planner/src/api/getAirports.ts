import axios from "axios";

const apiKey = import.meta.env.VITE_RAPAPI_CLIENT_TOKEN;
axios.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;

/**
 * Fetch airport data from the API
 * --------------------------------
 * Sends a GET request to retrieve airport data based on the provided query.
 *
 * @param query - The search string for airport location.
 * @returns The airport data from the API.
 * @throws An error if the API call fails.
 */

const fetchAirportData = async (query: string) => {
  console.log("QUERY: ", query);
  try {
    const response = await axios.get(
      `https://m2.eeazy.se/rapapi/airport?location=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch airport data"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export default fetchAirportData;
