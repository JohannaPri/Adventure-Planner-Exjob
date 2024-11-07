import React from 'react';
import AmadeusAPI from '../api/amadeusApi';

const GetHotelList: React.FC = () => {
    return (
        <AmadeusAPI endpoint="https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=STO&radiusUnit=KM&amenities=TELEVISION&ratings=2,3,4,5&hotelSource=ALL">
            {(data, loading, error) => {
                if (loading) return <div>Loading..</div>
                if (error) return <div>Error: {error}</div>

                return (
                    <div>
                        <h1>ACCOMMODATION</h1>
                        <pre>{JSON.stringify(data, null)}</pre>
                    </div>
                )
            }}
        </AmadeusAPI>
    )
}

export default GetHotelList;