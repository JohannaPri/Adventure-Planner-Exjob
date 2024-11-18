import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { formatFlightData } from "../utils/formattedFlightData";
import { AirplaneTilt } from "@phosphor-icons/react";

const FlightResults: React.FC = () => {

  const { data: flightData, status, error } = useSelector(
    (state: RootState) => state.flights
  );

  const formattedFlightData = flightData ? formatFlightData(flightData) : [];

  if (status === "loading") return <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto mt-20 text-center animate-pulse mb-20">
  <h2 className="text-xl md:text-2xl font-semibold text-slateGray mb-4">
    Oops, this is taking a bit longer than expected! 🌎✈️
  </h2>
  <p className="text-gray-700 text-base md:text-lg">
    There are so many amazing options, and we’re just making sure to bring you the best ones. Hang tight—your perfect adventure is almost ready!
  </p>
</div>
  if (status === "failed") return <div>Error: {error}</div>;

  console.log('FLIGHDATA: ', status === "succeeded");
  const hasSearched = status === "succeeded";

  if (hasSearched && (!formattedFlightData || formattedFlightData.length === 0)) {
    return <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto mt-20 text-center animate-pulse mb-20">
    <h2 className="text-xl md:text-2xl font-semibold text-slateGray mb-4">
    Uh-oh, no flights found! ✈️😮
    </h2>
    <p className="text-gray-700 text-base md:text-lg">
    Looks like all the planes are busy exploring other skies. Try adjusting your search—your perfect flight might just be one refresh away!
    </p> 
    </div>
  }

  
  return (
    <div className="space-y-4 w-screen max-h-[0px] mt-10">
    {formattedFlightData.map((flight, index) => (
    <div className="transition duration-300 hover:shadow-xl w-[40%] max-w-2xl p-6 mx-auto text-black bg-gradient-to-r to-orange-50 from-orange-200 border-2 border-white shadow-sm shadow-white rounded-lg" key={index}>
      <div className="grid items-center grid-cols-12 gap-4">
        {/* Outbound and Return Flights */}
        <div className="col-span-8 space-y-4">
          {/* Outbound Flight */}
          <div className="flex items-center gap-2">
            <AirplaneTilt size={24} className="text-black mr-4" />
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-bold">{flight.outbound.departure} - {flight.outbound.arrival}</p>
                  <p className="text-xs text-gray-600">{flight.outbound.carrier}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-center">{flight.outbound.departureTime} – {flight.outbound.arrivalTime}</p>
                  <p className="text-xs text-gray-600 text-center">{flight.outbound.duration} {flight.outbound.stops}</p>
                </div>
              </div>
            </div>
          </div>
  
          {/* Return Flight */}
          <div className="flex items-center gap-2">
            <AirplaneTilt size={24} className="text-black mr-4" />
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-bold">{flight.return.departure} - {flight.return.arrival}</p>
                  <p className="text-xs text-gray-600">{flight.return.carrier}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-center">{flight.return.departureTime} – {flight.return.arrivalTime}</p>
                  <p className="text-xs text-gray-600 text-center">{flight.return.duration} {flight.return.stops}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Price and Save Button (Centered vertically) */}
        <div className="ml-12 flex flex-col items-center justify-center col-span-4 space-y-4">
          <p className="text-lg font-bold text-black text-center">{flight.price}</p>
          <button className="w-full text-center justify-center shadow-md px-4 py-1 text-white border border-slateGray rounded-lg outline-none lg:px-1 font-extralight bg-slateGray hover:shadow-inner hover:shadow-gray-600 hover:bg-black hover:text-white hover:border-black">
            Save
          </button>
        </div>
      </div>
    </div>
    ))}
    </div>
  );



  // return (
  //   <section className="space-y-4">
  //     <div className="p-4 space-y-3 bg-gray-900 ">
  //       {formattedFlightData.map((flight, index) => (
  //         <div
  //           key={index}
  //           className="flex items-center justify-between max-w-xl p-4 mx-auto transition-shadow bg-white border rounded-lg shadow hover:shadow-lg"
  //         >
  //           <div className="flex items-center space-x-2">
  //             <div className="p-1 bg-white rounded-md">
  //               <AirplaneTilt size={24} className="text-red-600" />
  //             </div>
  //             <div>
  //               <p className="text-base font-semibold text-gray-800">
  //                 {flight.outbound.departure} - {flight.outbound.arrival}
  //               </p>
  //               <p className="text-xs text-gray-500">
  //                 {flight.outbound.carrier}
  //               </p>
  //             </div>
  //           </div>

  //           <div className="text-center">
  //             <p className="text-sm font-semibold text-gray-800">
  //               {flight.outbound.departureTime} – {flight.outbound.arrivalTime}
  //             </p>
  //             <p className="text-xs text-gray-500">{flight.outbound.duration} {flight.outbound.stops}</p>
  //           </div>

  //           <div className="text-center">
  //             <p className="text-sm font-semibold text-gray-800">
  //               {flight.return.departureTime} – {flight.return.arrivalTime}
  //             </p>
  //             <p className="text-xs text-gray-500">{flight.return.duration} {flight.return.stops}</p>
  //           </div>

  //           <div className="text-right">
  //             <p className="text-xl font-semibold text-purple-700">
  //               {flight.price}
  //             </p>
  //             <p className="text-xs text-gray-500">Economy</p>
  //             <button className="px-4 py-1 mt-3 text-sm font-semibold text-white transition duration-200 bg-green-600 rounded-md hover:bg-green-700">
  //               Save
  //             </button>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </section>
  // );
};

export default FlightResults;
