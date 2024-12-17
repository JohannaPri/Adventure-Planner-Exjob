import axios from "axios";

interface HotelQuery {
  destination: string;
  adults: number;
  children: number;
  checkin: string;
  checkout: string;
}

/**
 * Fetches hotel data based on the specified query parameters.
 * @param query - Object containing destination, number of adults, children, check-in and check-out dates.
 * @returns The hotel data retrieved from the API.
 * @throws An error if the request fails.
*/

const fetchHotelData = async (query: HotelQuery) => {
  const { destination, adults, children } = query;
  console.log("Fetching hotels with query: ", query);

  try {
    const response = await axios.get(
      `https://m2.eeazy.se/rapapi/hotel/hotels?city=${destination}&adult=${adults}&child=${children}`
    );
    console.log("API RESPONSE: ", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch hotels data"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export default fetchHotelData;
