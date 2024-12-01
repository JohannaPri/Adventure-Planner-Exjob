import axios from 'axios';

interface HotelQuery {
  destination: string;
  adults: number;
  children: number;
  checkin: string;
  checkout: string;
}

const fetchHotelData = async (query: HotelQuery) => {
  const { destination, adults, children } = query;
  console.log("Fetching hotels with query: ", query);
  
  try {
    const response = await axios.get(
      `https://m2.eeazy.se/rapapi/hotel/hotels?city=${destination}&adult=${adults}&child=${children}`
    );
    console.log('API RESPONSE: ', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch hotels data');
    }
    throw new Error('An unexpected error occurred');
  }
};

export default fetchHotelData;