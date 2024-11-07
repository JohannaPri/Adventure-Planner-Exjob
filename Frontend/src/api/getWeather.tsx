import React, { useState } from 'react';
import axios from 'axios';

interface WeatherData {
    temp: number;
    humidity: number;
    weather: string;
    timezone: string;
}

const GetWeather: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };

    const fetchWeather = async () => {
        if (!city) return;

        setLoading(true);
        setError('');
        setWeatherData(null);

        try {
            const response = await axios.get('https://m2.eeazy.se/rapapi/weather', {
                params: { city }
            });

            if (response.data.error) {
                setError(response.data.error);
            } else {
                setWeatherData({
                    temp: response.data.temp,
                    humidity: response.data.humidity,
                    weather: response.data.weather,
                    timezone: response.data.timezone,
                });
            }
        } catch (error) {
            setError('An error occurred while fetching the weather data.');
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="text" value={city} onChange={handleCityChange} placeholder="Enter city name" />
            <button onClick={fetchWeather} disabled={loading}>Get Weather</button>

            {weatherData && (
                <div>
                    <p>Temperature: {weatherData.temp}°C</p>
                    <p>Humidity: {weatherData.humidity}%</p>
                    <p>Weather: {weatherData.weather}</p>
                </div>
            )}

            {error && <p>{error}</p>}
        </div>
    );
};

export default GetWeather;