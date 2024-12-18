import axios from "axios";

interface CityQuery {
  destination: string;
}

/**
 * Get city data from the API
 * --------------------------
 * Sends a GET request to retrieve city-related data for hotel searches.
 *
 * @param query - Object containing the destination city name.
 * @returns The city data from the API.
 * @throws An error if the API call fails.
 */

const getCity = async (query: CityQuery) => {
  const { destination } = query;
  console.log("DESTINATION API: ", destination);
  console.log("Fetching city with query: ", query);

  try {
    const response = await axios.get(
      `https://m2.eeazy.se/rapapi/hotel/search?city=${destination}`
    );
    console.log("Selected City: ", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch city");
    }
    throw new Error("An unexpected error occurred");
  }
};

export default getCity;
