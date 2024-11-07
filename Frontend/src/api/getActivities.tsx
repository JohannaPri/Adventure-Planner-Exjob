import React, { useState, useEffect } from 'react';
import AmadeusAPI from '../api/amadeusApi';
import { getCoordinatesByCity } from './openCageApi';

const GetActivities: React.FC = () => {
    const [coordinates, setCoordinates] = useState<{lat: number, lon: number} | null>(null);
    const [city, setCity] = useState<string>('New York');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const coords = await getCoordinatesByCity(city);
                setCoordinates(coords);
            } catch (error) {
                setError('Error fetching coordinates.');
            }
        };

        fetchCoordinates();
    }, [city]);

    if (error) return <div>{error}</div>
    if (!coordinates) return <div>Loading coordinates...</div>

    return (
        <AmadeusAPI endpoint={`https://test.api.amadeus.com/v1/shopping/activities?latitude=${coordinates.lat}&longitude=${coordinates.lon}&radius=1`}>
            {(data, loading, error) => {
                console.log(data);
                if (loading) return <div>Loading..</div>
                if (error) return <div>Error: {error}</div>

                return (
                    <div>
                        <h1>ACTIVITIES</h1>
                        <pre>{JSON.stringify(data, null)}</pre>
                    </div>
                )
            }}
        </AmadeusAPI>
    )
}

export default GetActivities;