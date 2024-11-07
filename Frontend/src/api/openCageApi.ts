import axios from "axios";

export interface Coordinates {
    lat: number;
    lon: number;
}

const openCageKey = '28c2b935bff74ec6a5b097cf00405c66';

export const getCoordinatesByCity = async (city: string): Promise<Coordinates> => {
    const url = `https://m2.eeazy.se/rapapi/coordinates?city=${city}`;

    try {
        const response = await axios.get(url);
        const { lat, lon } = response.data || {};
        if (!lat || !lon) {
            throw new Error('City not found.');
        }
        return {lat, lon};
    } catch (error) {
        throw new Error('Error fetching coordinates.');
    }
};