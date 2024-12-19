import { useState, useEffect } from "react";
import { ButtonWIcon } from "../ButtonWIcon";
import FlightComponent from "../FlightComponent";
import AccommodationComponent from "../AccommodationComponent";
import FlightResults from "../FlightResults";
import Hotelresults from "../HotelResults";
type SearchType = "flight" | "accommodation" | "activities" | "weather";
import bgCarOpacity from "../../assets/background/carSearchOpacity.jpg";
import ActivityComponent from "../ActivityComponent";
import WeatherComponent from "../WeatherComponent";
import { Button } from "../Button";
import { NotificationComponent } from "../NotificationComponent";
import { Info } from "@phosphor-icons/react";
import ActivityResults from "../ActivityResults";

/**
 * `LoggedIn` component displays a dynamic user interface for logged-in users.
 * It allows users to search for flights, accommodation, activities, or weather updates.
 * Depending on the selected search type, different components will be rendered.
 *
 * @component
 */

const LoggedIn = () => {
  const [searchType, setSearchType] = useState<SearchType>("flight");

  const [selectedButton, setSelectedButton] = useState<string | null>("flight");
  const handleSelect = (buttonName: string) => {
    setSelectedButton(buttonName);
    setSearchType(buttonName as SearchType);
  };

  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [notificationContent, setNotificationContent] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const openNotification = (title: string, description: string) => {
    console.log("Notificion heey!");
    setNotificationContent({ title, description });
    setIsNotificationOpen(true);
  };

  const handleNotification = () => {
    openNotification(
      "Heads up, fellow traveler! 🌍",
      "This is a demo app powered by a test API, which means we can’t fetch data for every destination. For the full experience, make sure to search for London or New York—these are the stars of our show! 🌟 Some locations are still playing hard to get, but we’re working to bring them into the mix soon. On the bright side, we can fetch weather updates for any city or country, so you’ll always know what to pack. Thanks for your patience, and happy adventuring! 🗺️✨"
    );
  };

  // Effect hook for loading the background image once the component mounts
  useEffect(() => {
    const img = new Image();
    img.src = bgCarOpacity;
    img.onload = () => setIsImageLoaded(true);
  }, []);

  return (
    <>
      <section className="animate-fade-in-long relative flex flex-col items-center justify-center w-full h-fit my-25 bg-white mt-28 transition-all duration-2000">
        <div className="md:min-h-0 min-h-0 w-screen bg-black"></div>
        <div className="w-full max-w-screen-xl mx-auto">
          <section className="flex justify-center items-center w-fit h-auto max-w-screen-xl mx-auto overflow-hidden relative shadow-sm shadow-black rounded-lg">
            <div
              className={`w-screen p-4 rounded-md shadow-md bg-cover bg-no-repeat bg-center transition-all duration-500 ${
                isImageLoaded
                  ? "bg-bgCarOpacity opacity-100"
                  : "opacity-0 bg-white"
              }`}
            >
              <div className="lg:mx-4 relative backdrop-blur-sm border-black border flex lg:justify-start justify-center sm:flex-wrap sm:justify-center lg:space-x-4 mb-10 bg-white/75 rounded-xl p-2 lg:max-w-fit sm:max-w-screen max-w-screen md:max-w-fit">
                <ButtonWIcon
                  className={`p-2 rounded hover:scale-[1.05] transition-transform duration-300 sm:text-sm text-sm lg:text-base ${
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
                  className={`p-2 rounded hover:scale-[1.05] transition-transform duration-300 sm:text-sm text-sm lg:text-base ${
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
                  className={`p-2 rounded hover:scale-[1.05] transition-transform duration-300 sm:text-sm text-sm lg:text-base ${
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
                  className={`p-2 rounded hover:scale-[1.05] transition-transform duration-300 sm:text-sm text-sm lg:text-base ${
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
              <div className="flex flex-col gap-4 lg:w-[1280px] w-auto sm:w-auto lg-px4 lg:px-4 sm:px-0 md:px-0">
                {searchType === "flight" && <FlightComponent />}
                {searchType === "accommodation" && <AccommodationComponent />}
                {searchType === "activities" && <ActivityComponent />}
                {searchType === "weather" && <WeatherComponent />}
              </div>
            </div>
          </section>
        </div>
      </section>
      {searchType === "flight" && <FlightResults />}
      {searchType === "accommodation" && <Hotelresults />}
      {searchType === "activities" && <ActivityResults />}
      {searchType === "weather" && <div className="h-[120px]"></div>}
      <div className="mt-28"></div>
      <div>
        <Button
          className="fixed bottom-6 cursor-pointer right-6 bg-slateGray w-14 h-14 shadow-slateGray text-white rounded-full flex items-center justify-center shadow-md z-30 hover:bg-slate-400"
          onClick={() => handleNotification()}
        >
          <Info size={48} />
        </Button>
      </div>
      {isNotificationOpen && notificationContent && (
        <NotificationComponent
          title={notificationContent.title}
          description={notificationContent.description}
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
          icon={<Info size={60} />}
        />
      )}
    </>
  );
};

export default LoggedIn;
