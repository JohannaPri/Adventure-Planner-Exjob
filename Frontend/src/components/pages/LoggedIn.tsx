import React, { useState, useEffect } from "react";
import { ButtonWIcon } from "../ButtonWIcon";
import FlightComponent from "../FlightComponent";
import AccommodationComponent from "../AccommodationComponent";
import FlightResults from "../FlightResults";
type SearchType = "flight" | "accommodation" | "activities" | "weather";
import bgCarOpacity from "../../assets/background/carSearchOpacity.jpg";
import ActivityComponent from "../ActivityComponent";
import WeatherComponent from "../WeatherComponent";

const LoggedIn = () => {
  const [searchType, setSearchType] = useState<SearchType>("flight");
  //const [error, setError] = useState<string | null>(null);

  const [selectedButton, setSelectedButton] = useState<string | null>("flight");
  const handleSelect = (buttonName: string) => {
    setSelectedButton(buttonName);
    setSearchType(buttonName as SearchType);
  };

  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();
    img.src = bgCarOpacity;
    img.onload = () => setIsImageLoaded(true);
  }, []);

  return (
    <>
    <section className="relative flex flex-col items-center justify-center w-full h-fit my-25 md:px-20 bg-white mt-28 transition-all duration-2000">
      <div className="md:min-h-0 min-h-0 w-screen bg-black"></div>
      <div className="w-full max-w-screen-xl mx-auto">
      <section className="flex justify-center items-center w-fit h-auto max-w-screen-xl mx-auto overflow-hidden relative shadow-sm shadow-black rounded-lg">
        <div className={`w-fit p-4 rounded-md shadow-md bg-cover bg-no-repeat bg-center transition-all duration-500 ${isImageLoaded ? "bg-bgCarOpacity opacity-100" : "opacity-0 bg-white"}`}>
          <div className="mx-4 relative backdrop-blur-sm border-black border flex lg:justify-start justify-center sm:flex-wrap sm:justify-center space-x-4 mb-10 bg-white/75 rounded-xl p-2 max-w-fit">
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
          <div className="flex flex-col gap-4 w-[1280px] px-4">
            {searchType === "flight" && (<FlightComponent />)}
            {searchType === "accommodation" && ( <AccommodationComponent /> )}
            {searchType === "activities" && ( <ActivityComponent /> )}
            {searchType === "weather" && ( <WeatherComponent /> )}
          </div>
        </div>
      </section>
        </div>
    </section>
    {searchType === "flight" && (<FlightResults />)}
    <div className="mt-28"></div>
    </>
  );
};

export default LoggedIn;