import axios from "axios";

export interface Coordinates {
  lat: number;
  lon: number;
}

/**
 * Fetches the coordinates (latitude and longitude) for a given city.
 * @param city - The name of the city to retrieve coordinates for.
 * @returns An object containing the latitude and longitude of the city.
 * @throws An error if the coordinates cannot be found or the API request fails.
 */

export const getCoordinatesByCity = async (
  city: string
): Promise<Coordinates> => {
  const url = `https://m2.eeazy.se/rapapi/coordinates?city=${city}`;

  try {
    const response = await axios.get(url);
    const { lat, lon } = response.data || {};
    if (!lat || !lon) {
      throw new Error("City not found.");
    }
    return { lat, lon };
  } catch (error) {
    throw new Error("Error fetching coordinates.");
  }
};
