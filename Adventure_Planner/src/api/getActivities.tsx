import axios from "axios";

interface ActivityQuery {
  destination: string;
  date: string;
  adults: number;
  children: number;
}

/**
 * Fetch activity data from the API
 * --------------------------------
 * Sends a GET request to retrieve activity data based on the provided query.
 * 
 * @param query - Object containing destination, date, and number of adults/children.
 * @returns The activity data from the API.
 * @throws An error if the API call fails.
*/

const fetchActivityData = async (query: ActivityQuery) => {
  const { destination, date, adults, children } = query;
  console.log("Fetching activities with query: ", query);

  try {
    const response = await axios.get(
      `https://m2.eeazy.se/rapapi/activity/activities?city=${destination}&date=${date}&adult=${adults}&child=${children}`
    );
    console.log("API RESPONSE: ", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch activity data"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export default fetchActivityData;
