import React, { useState } from "react";
import { ButtonWIcon } from "../ButtonWIcon";
import FlightComponent from "../FlightComponent";
import AccommodationComponent from "../AccommodationComponent";

type SearchType = "flight" | "accommodation" | "activities" | "weather";

const LoggedIn = () => {
  const [searchType, setSearchType] = useState<SearchType>("flight");
  //const [error, setError] = useState<string | null>(null);

  const [selectedButton, setSelectedButton] = useState<string | null>("flight");
  const handleSelect = (buttonName: string) => {
    setSelectedButton(buttonName);
    setSearchType(buttonName as SearchType);
  };

  return (
    <section className="relative flex flex-col items-center justify-center w-full h-screen px-6 my-25 lg:px-24 md:px-20 bg-white">
      <div className="md:min-h-0 min-h-0 w-screen bg-black"></div>
      <section className="flex justify-center items-center w-auto lg:h-fit h-fit overflow-hidden relative shadow-sm shadow-black rounded-lg">
        <div className="w-auto h-auto p-4 rounded-md shadow-md bg-bgMapMix">
          <div className="relative backdrop-blur-sm border-black border flex lg:justify-start justify-center sm:flex-wrap sm:justify-center space-x-4 mb-10 bg-white/75 rounded-xl p-2 max-w-fit">
            <ButtonWIcon
              className={`p-2 rounded hover:scale-[1.05] transition-transform duration-300 ${
                searchType === "flight"
                  ? "bg-transparent text-slateGray"
                  : "bg-red-transparent"
              }`}
              iconName="AirplaneTilt"
              size={28}
              selected={selectedButton === "flight"}
              onClick={() => handleSelect("flight")}
            >
              Flight
            </ButtonWIcon>
            <ButtonWIcon
              className={`p-2 rounded hover:scale-[1.05] transition-transform duration-300 ${
                searchType === "accommodation"
                  ? "bg-transparent text-slateGray"
                  : "bg-red-transparent"
              }`}
              iconName="House"
              size={28}
              selected={selectedButton === "accommodation"}
              onClick={() => handleSelect("accommodation")}
            >
              Accommodation
            </ButtonWIcon>
            <ButtonWIcon
              className={`p-2 rounded hover:scale-[1.05] transition-transform duration-300 ${
                searchType === "activities"
                  ? "bg-transparent text-slateGray"
                  : "bg-red-transparent"
              }`}
              iconName="Mountains"
              size={28}
              selected={selectedButton === "activities"}
              onClick={() => handleSelect("activities")}
            >
              Activities
            </ButtonWIcon>
            <ButtonWIcon
              className={`p-2 rounded hover:scale-[1.05] transition-transform duration-300 ${
                searchType === "weather"
                  ? "bg-transparent text-slateGray"
                  : "bg-red-transparent"
              }`}
              iconName="Sun"
              size={28}
              selected={selectedButton === "weather"}
              onClick={() => handleSelect("weather")}
            >
              Weather
            </ButtonWIcon>
          </div>
          <div className="flex flex-col gap-4">
            {searchType === "flight" && (
                <FlightComponent />
            )}
            {searchType === "accommodation" && (
                <AccommodationComponent />
            )}
          </div>
        </div>
      </section>
  
    </section>
  );
};

export default LoggedIn;

// Flight
// Round-trip or one-way-trip
// Departure
// Destination
// Dates
// Travelers

// Accommodation
// Destination
// Dates
// Guests

// Activities
// Country / City
// What to do?
// Participant

// Weather
// Country / City
