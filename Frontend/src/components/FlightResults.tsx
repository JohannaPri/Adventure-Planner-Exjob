import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { formatFlightData } from "../utils/formattedFlightData";

const FlightResults: React.FC = () => {
  const {
    data: flightData,
    status,
    error,
  } = useSelector((state: RootState) => state.flights);



  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  if (!Array.isArray(flightData) || flightData.length === 0)
    return <div>No flight data available</div>;



  return (
    <>
    </>
  )
};

export default FlightResults;
