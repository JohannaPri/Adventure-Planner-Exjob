import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Input } from "./Input";
import { Button } from "./Button";
import { Select } from "./Select";
import debounce from "lodash/debounce";
import { AirplaneTakeoff, AirplaneLanding, UserList } from "@phosphor-icons/react";
import { fetchAirports } from "../redux/slices/airportSlice";
import { AppDispatch, RootState } from "../redux/store";
import { DatePickerComponent } from "./DatePickerComponent";
import { parseAsBoolean, parseAsInteger, parseAsIsoDate, parseAsString, useQueryState } from 'nuqs';


const FlightComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [destination, setDestination] = useState<string>("");
  const [departure, setDeparture] = useState<string>("");
  const [airportSuggestions, setAirportSuggestions] = useState<string[]>([]);
  const [activeInput, setActiveInput] = useState<'departure' | 'destination' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const airportData = useSelector((state: RootState) => state.airport.data);
  const airportStatus = useSelector((state: RootState) => state.airport.status);
  const airportError = useSelector((state: RootState) => state.airport.error);

  type DatePickerComponentProps = {
    onDateChange: (fromDate: string, toDate: string) => void;
  };
  

  // QUERY nuqs

  //

  const handleDateChange = (fromDate: string, toDate: string) => {
    console.log(`From: `, fromDate);
    console.log(`To: `, toDate);
  }

  const handleDestinationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDestination(value);
    debouncedFetchAirports(value);
    if (airportData) {
      setAirportSuggestions(airportData.map(airport => airport.displayname));
    }
  }

  const handleAirportSelect = (airportName: string) => {
    if (activeInput === 'departure') {
      setDeparture(airportName);
    } else if (activeInput === 'destination') {
      setDestination(airportName);
    }
    setAirportSuggestions([]);
  };

  const handleFocus = (inputType: 'departure' | 'destination') => {
    setActiveInput(inputType);
  };

  const debouncedFetchAirports = useCallback(
    debounce((input: string) => {
      if (input) {
        dispatch(fetchAirports(input));
      }
    }, 200),
    [dispatch]
  );

  const handleDepartureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDeparture(value);
    debouncedFetchAirports(value > '' ? value : '');
    console.log(value)
    if (airportData) {
      setAirportSuggestions(airportData.map(airport => airport.displayname));
    }
  };

  const [adults, setAdults] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);
  const [isPassengerListOpen, setIsPassengerListOpen] = useState<boolean>(false);

  const togglePassengerSelector = () => setIsPassengerListOpen((prev) => !prev);
  const incrementAdults = () => setAdults((prev) => Math.min(prev + 1, 10));
  const decrementAdults = () => setAdults((prev) => Math.max(prev - 1, 0));
  const incrementChildren = () => setChildren((prev) => Math.min(prev + 1, 10));
  const decrementChildren = () => setChildren((prev) => Math.max(prev - 1, 0));


    return (
        <>
        <div className="flex flex-col p-4 space-y-4">
        <Select
          containerClass="relative"
          selectClass="border bg-white border-slateGray rounded-lg outline-none lg:w-[300px] w-full h-[50px] focus:outline-none text-slateGray pr-4 pl-4 py-1 cursor-pointer"
        >
          <option value="round-trip">Round-Trip</option>
          <option value="one-way-trip">One-Way-Trip</option>
        </Select>
        <div className="flex flex-col gap-4 md:flex-row md:gap-4">
          <Input
            onFocus={() => handleFocus('departure')}
            onChange={handleDepartureChange}
            containerClass="relative"
            inputClass="border border-slateGray rounded-lg outline-none lg:w-[300px] w-full h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1 cursor-pointer"
            type="text"
            placeholder="Departure"
            value={departure}
          >
            <div className="absolute text-white top-4 left-3">
              <AirplaneTakeoff
                size={20}
                color="slateGray"
                weight="regular"
              />
            </div>
          </Input>
          <Input
            onFocus={() => handleFocus('destination')}
            onChange={handleDestinationChange}
            containerClass="relative"
            inputClass="border border-slateGray rounded-lg outline-none lg:w-[300px] w-full h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1 cursor-pointer"
            type="text"
            placeholder="Destination"
            value={destination}
          >
            <div className="absolute text-white top-4 left-3">
              <AirplaneLanding
                size={20}
                color="slateGray"
                weight="regular"
              />
            </div>
          </Input>
          <div className="relative lg:w-[300px] sm:w-[100%] w-screen h-auto">
            <DatePickerComponent onDateChange={handleDateChange} />
          </div>
          <div>
            <Button
              onClick={togglePassengerSelector}
              className="border border-slateGray bg-white text-slateGray rounded-lg lg:w-[300px] w-full h-[50px] p-2 flex items-center justify-start"
            >
              <div className="mr-2">
                <UserList
                  size={20}
                  color="slateGray"
                  weight="regular"
                />
              </div>
              <span className="text-slate-500">
                {adults > 0 || children > 0
                  ? `Adults: ${adults} , Children: ${children}`
                  : "Travelers"}
              </span>
            </Button>

            <div className="relative">
              <div
                className={`absolute top-full left-0 border border-slateGray rounded-lg outline-none lg:w-[300px] mt-2 w-full bg-white text-slateGray p-4 space-y-3 transition-all duration-300 ease-in-out ${
                  isPassengerListOpen
                    ? "opacity-100 max-h-[300px]"
                    : "opacity-0 max-h-0"
                } overflow-hidden z-20`}
              >
                <div className="z-10 flex items-center justify-between">
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
        </div>
        
        {airportStatus === 'succeeded' && airportData && airportSuggestions.length > 0 && (
          <div className="mt-4">
            <ul className="bg-white border rounded-lg border-slateGray">
              {airportSuggestions.map((airportName, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-cloudGray"
                  onClick={() => handleAirportSelect(airportName)}
                >
                  <h2 className="text-slateGray">{airportName}</h2>
                </li>
              ))}
            </ul>
          </div>
        )}

        {airportError && <p className="text-red-500">{airportError}</p>}
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          className="mt-14 bg-white/75 backdrop-blur-sm border-[0.5px] border-black before:top-0 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-white/65 before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base"
        >
          Search
        </Button>
      </div>
    </>
  )
}

export default FlightComponent;