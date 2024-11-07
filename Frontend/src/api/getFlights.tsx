import React from 'react';
import AmadeusAPI from '../api/amadeusApi';

const GetFlights: React.FC = () => {
    return (
        <AmadeusAPI endpoint="https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=LON&destinationLocationCode=NYC&departureDate=2024-11-10&returnDate=2024-12-05&adults=2&nonStop=true&currencyCode=EUR&max=10">
            {(data, loading, error) => {
                if (loading) return <div>Loading..</div>
                if (error) return <div>Error: {error}</div>

                return (
                    <div>
                        <h1>FLIGHTS</h1>
                        <pre>{JSON.stringify(data, null)}</pre>
                    </div>
                )
            }}
        </AmadeusAPI>
    )
}

export default GetFlights;