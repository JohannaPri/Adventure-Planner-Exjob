import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer cfe2b62c-bbcc-4a1f-8710-d0baeeb82d1f`;

const fetchAirportData = async (query: string) => {
  try {
    const response = await axios.get(
      `https://m2.eeazy.se/rapapi/airport?location=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch airport data');
    }
    throw new Error('An unexpected error occurred');
  }
};

export default fetchAirportData;