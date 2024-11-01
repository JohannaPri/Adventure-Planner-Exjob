import React, { useState } from "react";
import { Text } from "../Text";
import { Input } from "../Input";
import { Button } from "../Button";
import { ButtonWIcon } from "../ButtonWIcon";
import { Select } from "../Select";
import {
  MagnifyingGlass,
  List,
  AirplaneTakeoff,
  AirplaneLanding,
  UserList,
  ArrowRight,
  AirplaneTilt,
  House,
  Mountains,
  Sun,
} from "@phosphor-icons/react";
import Datepicker from "react-tailwindcss-datepicker";

type SearchType = "flight" | "accommodation" | "activities" | "weather";

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const LoggedIn = () => {
  const [searchType, setSearchType] = useState<SearchType>("flight");
  const [error, setError] = useState<string | null>(null);

  const START_FROM = new Date();
  START_FROM.setMonth(START_FROM.getMonth() + 1);

  const MIN_DATE = new Date();
  MIN_DATE.setDate(MIN_DATE.getDate() + 1);

  const [selectedButton, setSelectedButton] = useState<string | null>("flight");

  const handleSelect = (buttonName: string) => {
    setSelectedButton(buttonName);
    setSearchType(buttonName as SearchType);
  }

  const [value, setValue] = useState<DateRange>({
    startDate: new Date(),
    endDate: null,
  });

  const handleChange = (newValue: DateRange | null) => {
    if (newValue) {
      setValue(newValue);
    } else {
      setValue({
        startDate: new Date(),
        endDate: null,
      });
    }

    console.log(value);
  };

  //
  const [adults, setAdults] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);
  const [isPassengerListOpen, setIsPassengerListOpen] =
    useState<boolean>(false);

  const incrementAdults = () => setAdults((prev) => Math.min(prev + 1, 10));
  const decrementAdults = () => setAdults((prev) => Math.max(prev - 1, 0));

  const incrementChildren = () => setChildren((prev) => Math.min(prev + 1, 10));
  const decrementChildren = () => setChildren((prev) => Math.max(prev - 1, 0));

  const togglePassengerSelector = () => setIsPassengerListOpen((prev) => !prev);
  //

  return (
    <section className="relative flex flex-col items-center justify-center w-full h-screen px-6 my-25 lg:px-24 md:px-20 bg-white">
      <section className="flex justify-center items-center w-auto lg:h-screen h-screen overflow-hidden relative mb-40">
        <div className="w-auto h-auto p-4 rounded-md shadow-md bg-bgMapMix mt-20">
          <div className="relative backdrop-blur-sm border-[0.5px] border-black border flex lg:justify-start justify-center sm:flex-wrap sm:justify-center space-x-4 mb-10 bg-white/75 rounded-xl p-2 max-w-fit">
            <ButtonWIcon
              className={`p-2 rounded ${
                searchType === "flight"
                  ? "bg-transparent text-slateGray"
                  : "bg-red-transparent"
              }`}
              iconName="AirplaneTilt"
              size={28}
              selected={selectedButton === 'flight'}
              onClick={() => handleSelect("flight")}
              >Flight
            </ButtonWIcon>
                        <ButtonWIcon
              className={`p-2 rounded ${
                searchType === "accommodation"
                  ? "bg-transparent text-slateGray"
                  : "bg-red-transparent"
              }`}
              iconName="House"
              size={28}
              selected={selectedButton === 'accommodation'}
              onClick={() => handleSelect("accommodation")}
              >Accommodation
            </ButtonWIcon>
                         <ButtonWIcon
              className={`p-2 rounded ${
                searchType === "activities"
                  ? "bg-transparent text-slateGray"
                  : "bg-red-transparent"
              }`}
              iconName="Mountains"
              size={28}
              selected={selectedButton === 'activities'}
              onClick={() => handleSelect("activities")}
              >Activities
            </ButtonWIcon>
            <ButtonWIcon
              className={`p-2 rounded ${
                searchType === "weather"
                  ? "bg-transparent text-slateGray"
                  : "bg-red-transparent"
              }`}
              iconName="Sun"
              size={28}
              selected={selectedButton === 'weather'}
              onClick={() => handleSelect("weather")}
              >Weather
            </ButtonWIcon>
          </div>
          <div className="flex flex-col gap-4">
            {searchType === "flight" && (
              <>
                <Select
                  containerClass="relative"
                  selectClass="border bg-white border-slateGray rounded-lg outline-none lg:w-[300px] w-full h-[50px] focus:outline-none text-slateGray pr-4 pl-4 py-1"
                >
                  <option value="round-trip">Round-Trip</option>
                  <option value="one-way-trip">One-Way-Trip</option>
                </Select>
                <div className="flex flex-col gap-4 md:flex-row md:gap-4">
                  <Input
                    containerClass="relative"
                    inputClass="border border-slateGray rounded-lg outline-none lg:w-[300px] w-full h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1"
                    type="text"
                    placeholder="Departure"
                  >
                    <div className="absolute top-4 left-3 text-white">
                      <AirplaneTakeoff
                        size={18}
                        color="slateGray"
                        weight="regular"
                      />
                    </div>
                  </Input>
                  <Input
                    containerClass="relative"
                    inputClass="border border-slateGray rounded-lg outline-none lg:w-[300px] w-full h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1"
                    type="text"
                    placeholder="Destination"
                  >
                    <div className="absolute top-4 left-3 text-white">
                      <AirplaneLanding
                        size={18}
                        color="slateGray"
                        weight="regular"
                      />
                    </div>
                  </Input>
                  <div className="relative lg:w-[300px] sm:w-[100%] w-screen h-auto">
                    <Datepicker
                      value={value}
                      onChange={handleChange}
                      primaryColor={"sky"}
                      separator={"→"}
                      startFrom={START_FROM}
                      popoverDirection="down"
                      minDate={MIN_DATE}
                      displayFormat={"MM/DD/YYYY"}
                      readOnly
                      inputClassName="border border-slateGray cursior-pointer rounded-lg outline-none w-[300px] h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1"
                    />
                  </div>
                  <div>
                    <Button
                      onClick={togglePassengerSelector}
                      className="border border-slateGray bg-white text-slateGray rounded-lg lg:w-[300px] w-full h-[50px] p-2 flex items-center justify-start"
                    >
                      <div className="mr-2">
                        <UserList
                          size={18}
                          color="slateGray"
                          weight="regular"
                        />
                      </div>
                      <span className="text-slate-500">
                        { adults > 0 || children > 0 
                        ? `Adults: ${adults} , Children: ${children}` 
                        : 'Travelers' }
                      </span>
                    </Button>

                    <div
                      className={`border border-slateGray rounded-lg outline-none lg:w-[300px] w-full bg-white text-slateGray p-4 space-y-3 transition-all duration-300 ease-in-out ${
                        isPassengerListOpen
                          ? "opacity-100 max-h-[300px]"
                          : "opacity-0 max-h-0"
                      } overflow-hidden`}
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Adults:</label>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={decrementAdults}
                            className="flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer bg-cloudGray text-slateGray hover:bg-cloudGray2 hover:text-black"
                          >
                            -
                          </button>
                          <span className="w-5 text-sm text-center">
                            {adults}
                          </span>
                          <button
                            onClick={incrementAdults}
                            className="flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer bg-cloudGray text-slateGray hover:bg-cloudGray2 hover:text-black"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Children:</label>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={decrementChildren}
                            className="flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer bg-cloudGray text-slateGray hover:bg-cloudGray2 hover:text-black"
                          >
                            -
                          </button>
                          <span className="w-5 text-sm text-center">
                            {children}
                          </span>
                          <button
                            onClick={incrementChildren}
                            className="flex items-center justify-center w-8 h-8 transition rounded-full cursor-pointer bg-cloudGray text-slateGray hover:bg-cloudGray2 hover:text-black"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="button" className="bg-white/75 backdrop-blur-sm border-[0.5px] border-black border border-2 border-gray-950 before:top-0 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-white/65 before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base">Search</Button>
                </div>
              </>
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
