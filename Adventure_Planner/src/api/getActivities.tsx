import axios from "axios";

interface ActivityQuery {
  destination: string;
  date: string;
  adults: number;
  children: number;
}

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
