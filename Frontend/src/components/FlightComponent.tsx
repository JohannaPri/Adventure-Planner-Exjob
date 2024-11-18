import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useReducer,
} from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import store, { AppDispatch, RootState } from "../redux/store";
import { fetchAirports } from "../redux/slices/airportSlice";
import {
  fetchFlights,
  setDeparture,
  setDestination,
  clearDeparture,
  clearDestination,
  setDateFrom,
  setDateTo,
} from "../redux/slices/flightSlice";
import debounce from "lodash/debounce";
import { Input } from "./Input";
import { Button } from "./Button";
import { Select } from "./Select";
import {
  AirplaneTakeoff,
  AirplaneLanding,
  UserList,
  Trash,
} from "@phosphor-icons/react";
import { DatePickerComponent } from "./DatePickerComponent";
import FlightResults from "./FlightResults";
import { toast } from 'keep-react';

interface SuggestionsDropdownProps {
  suggestions: string[];
  onSelect: (value: string) => void;
  position: { top: number; left: number; width: number; };
}

const FlightComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [localDestination, setLocalDestination] = useState<string>("");
  const [localDeparture, setLocalDeparture] = useState<string>("");
  const [airportSuggestions, setAirportSuggestions] = useState<string[]>([]);
  const [activeInput, setActiveInput] = useState<
    "departure" | "destination" | null
  >(null);

  const [hasSelectedDeparture, setHasSelectedDeparture] =
    useState<boolean>(false);
  const [hasSelectedDestination, setHasSelectedDestination] =
    useState<boolean>(false);

  const departureInputRef = useRef<HTMLInputElement | null>(null);
  const destinationInputRef = useRef<HTMLInputElement | null>(null);
  const airportSuggestionsRef = useRef<HTMLUListElement | null>(null);

  const airportData = useSelector((state: RootState) => state.airport.data);
  const airportStatus = useSelector((state: RootState) => state.airport.status);
  const airportError = useSelector((state: RootState) => state.airport.error);

  const [departureCity, setDepartureCity] = useState<string | null>(null);
  const [destinationCity, setDestinationCity] = useState<string | null>(null);

  const [adults, setAdults] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);
  const [isPassengerListOpen, setIsPassengerListOpen] =
    useState<boolean>(false);

  const [airportsLoading, setAirportsLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const [resetDatePicker, setResetDatePicker] = useState<boolean>(false);
 
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const togglePassengerSelector = () => setIsPassengerListOpen((prev) => !prev);
  const incrementAdults = () => setAdults((prev) => Math.min(prev + 1, 10));
  const decrementAdults = () => setAdults((prev) => Math.max(prev - 1, 0));
  const incrementChildren = () => setChildren((prev) => Math.min(prev + 1, 10));
  const decrementChildren = () => setChildren((prev) => Math.max(prev - 1, 0));

  const departure = useSelector((state: RootState) => state.flights.departure);
  const destination = useSelector((state: RootState) => state.flights.destination);
  const dateFrom = useSelector((state: RootState) => state.flights.dateFrom);
  const dateTo = useSelector((state: RootState) => state.flights.dateTo);
  useSelector((state: RootState) => state.flights);

  const [tripType, setTripType] = useState<"round-trip" | "one-way">(
    "round-trip"
  );

  const handleDepartureChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setLocalDeparture(value);
    if (value.length >= 3) {
      debouncedFetchAirports(value);
    }
  };

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setLocalDestination(value);
    if (value.length >= 3) {
      debouncedFetchAirports(value);
    }
  };

  const handleAirportSelect = (airportName: string) => {
    const matchedAirport = airportData?.find(
      (airport) => airport.displayname === airportName
    );

    if (matchedAirport) {
      if (activeInput === "departure") {
        dispatch(setDeparture(matchedAirport.id));
        setDepartureCity(matchedAirport.displayname);
        setLocalDeparture(airportName);
        setHasSelectedDeparture(true);
      } else if (activeInput === "destination") {
        dispatch(setDestination(matchedAirport.id));
        setDestinationCity(matchedAirport.displayname);
        setLocalDestination(airportName);
        setHasSelectedDestination(true);
      }
    }
    setAirportSuggestions([]);
    setDropdownPosition(null);
  };

  const debouncedFetchAirports = useCallback(
    debounce(async (input: string) => {
      if (input) {
        setAirportsLoading(true);
        await dispatch(fetchAirports(input));
        setAirportsLoading(false);
      }
    }, 500),
    [dispatch]
  );

  const handleDateChange = (fromDate: string, toDate: string) => {
    dispatch(setDateFrom(fromDate));
    dispatch(setDateTo(toDate));
  };

  useEffect(() => {
    if (Array.isArray(airportData)) {
      const suggestions = airportData.map((airport) => airport.displayname || "");
      setAirportSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setAirportSuggestions([]);
      setShowSuggestions(false);
    }
  }, [airportData]);

  const handleClearDeparture = () => {
    setDeparture("");
    setLocalDeparture("");
    dispatch(clearDeparture());
    setHasSelectedDeparture(false);
    if (departureInputRef.current) {
      departureInputRef.current.focus();
    }
  };

  const handleClearDestination = () => {
    setDestination("");
    setLocalDestination("");
    dispatch(clearDestination());
    setHasSelectedDestination(false);
    if (destinationInputRef.current) {
      destinationInputRef.current.focus();
    }
  };

  const SuggestionsDropdown: React.FC<SuggestionsDropdownProps> = ({
    suggestions,
    onSelect,
    position,
  }) => {
    const dropDownStyle = {
      position: "absolute" as const,
      top: `${position.top + 8}px`,
      left: `${position.left}px`,
      width: `${position.width}px`,
      zIndex: 5,
    };
  
    return ReactDOM.createPortal(
      <div 
        style={dropDownStyle}
        className="bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul className="max-h-60 overflow-y-auto" ref={airportSuggestionsRef}>
            {suggestions.map((suggestion, index) => (
              <li 
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-100" 
                onClick={() => onSelect(suggestion)}
                >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>,
        document.body
    );
  }

  const handleInputFocus = (
    inputRef: React.RefObject<HTMLInputElement>,
    inputType: "departure" | "destination"
  ) => {
    setActiveInput(inputType);

    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  const handleSearch = async () => {
    const state = store.getState();
    const departure = state.flights.departure;
    const destination = state.flights.destination;

    // No values
    console.log(dateFrom);
    console.log(dateTo);

    if (!departure) {
      alert(departure);
    }

    if (!destination) {
      alert(destination);
    }

    if (!dateFrom) {
      alert(dateFrom);
    }

    if (!dateTo) {
      alert(dateTo);
    }

    if (!adults) {
      alert(adults);
    }

    const requestParams = {
      tripType,
      departure,
      destination,
      dateFrom,
      dateTo: tripType === "round-trip" ? dateTo : "",
      adults,
      children,
    };

    try {
      await dispatch(fetchFlights(requestParams)).unwrap();
    } catch (error: any) {
      console.error(error.message || "An error occured while fetching flights");
    }
  };

  const handleResetSearch = () => {
    setLocalDeparture("");
    setLocalDestination("");
    setDepartureCity(null);
    setDestinationCity(null);
    setAdults(0);
    setChildren(0);
    setHasSelectedDeparture(false);
    setHasSelectedDestination(false);
    setShowSuggestions(false);
    setDropdownPosition(null);
    setDateFrom("");
    setDateTo("");
    

    dispatch(clearDeparture());
    dispatch(clearDestination());
    dispatch(setDateFrom(""));
    dispatch(setDateTo(""));

    setIsPassengerListOpen(false);

    if (departureInputRef.current) departureInputRef.current.focus();

    setResetDatePicker(true);
    setTimeout(() => setResetDatePicker(false), 0);
  }

  const passengerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof Node && passengerRef.current && !passengerRef.current.contains(event.target)) {
        setIsPassengerListOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const handleClickOutsideInput = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        airportSuggestionsRef.current &&
        !airportSuggestionsRef.current?.contains(event.target)
      ) {
        setDropdownPosition(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideInput);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideInput);
    }
  }, []);

  return (
    <>
      <div className="space-y-4 relative">
        <Select
          containerClass="relative"
          selectClass="border bg-white border-slateGray rounded-lg outline-none lg:w-[300px] w-full h-[50px] focus:outline-none text-slateGray pr-4 pl-4 py-1 cursor-pointer"
        >
          <option value="round-trip">Round-Trip</option>
          <option value="one-way-trip">One-Way-Trip</option>
        </Select>

        <div className="flex flex-col gap-4 md:flex-row md:gap-4">
          <div className="relative">
            <Input
              ref={departureInputRef}
              onFocus={() => handleInputFocus(departureInputRef, "departure")}
              onChange={handleDepartureChange}
              containerClass="relative"
              inputClass="border border-slateGray rounded-lg outline-none lg:w-[300px] w-full h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1 cursor-pointer"
              type="text"
              placeholder="Departure (min 3 letters)"
              value={localDeparture}
            >
              <div className="absolute text-white top-4 left-3">
                <AirplaneTakeoff size={20} color="slateGray" weight="regular" />
              </div>

              {hasSelectedDeparture && localDeparture && (
                <div className="absolute top-1/2 left-9 transform -translate-y-1/2 flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full max-w-[252px] overflow-hidden">
                  <span className="text-slateGray text-ellipsis overflow-hidden whitespace-nowrap">
                    {localDeparture.length > 20
                      ? `${localDeparture.slice(0, 25)}...`
                      : localDeparture}
                  </span>
                  <button
                    onClick={handleClearDeparture}
                    className="text-slateGray text-sm cursor-pointer"
                  >
                    &times;
                  </button>
                </div>
              )}
            </Input>
            {airportSuggestions.length > 0 && dropdownPosition && activeInput === "departure" && (
              <SuggestionsDropdown
                suggestions={airportSuggestions}
                onSelect={handleAirportSelect}
                position={dropdownPosition}
              />
            )}
          </div>

          <div className="relative">
            <Input
              ref={destinationInputRef}
              onFocus={() => handleInputFocus(destinationInputRef, "destination")}
              onChange={handleDestinationChange}
              containerClass="relative"
              inputClass="border border-slateGray rounded-lg outline-none lg:w-[300px] w-full h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1 cursor-pointer"
              type="text"
              placeholder="Destination (min 3 letters)"
              value={localDestination}
            >
              <div className="absolute text-white top-4 left-3">
                <AirplaneLanding size={20} color="slateGray" weight="regular" />
              </div>

              {hasSelectedDestination && localDestination && (
                <div className="absolute top-1/2 left-9 transform -translate-y-1/2 flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full max-w-[100%] overflow-hidden">
                  <span className="text-slateGray text-ellipsis overflow-hidden whitespace-nowrap">
                    {localDestination.length > 20
                      ? `${localDestination.slice(0, 25)}...`
                      : localDestination}
                  </span>
                  <button
                    onClick={handleClearDestination}
                    className="text-slateGray text-sm cursor-pointer"
                  >
                    &times;
                  </button>
                </div>
              )}
            </Input>
            {airportSuggestions.length > 0 && dropdownPosition && activeInput === "destination" && (
              <SuggestionsDropdown
                suggestions={airportSuggestions}
                onSelect={handleAirportSelect}
                position={dropdownPosition}
              />
            )}
          </div>

          <div className="relative lg:w-[300px] sm:w-[100%] w-screen h-auto">
            <DatePickerComponent reset={resetDatePicker} onDateChange={handleDateChange} />
          </div>
          <div ref={passengerRef} className="relative">
            <Button
              onClick={togglePassengerSelector}
              className="border border-slateGray bg-white text-slateGray rounded-lg lg:w-[300px] w-full h-[50px] p-2 flex items-center justify-start"
            >
              <div className="mr-2">
                <UserList size={20} color="slateGray" weight="regular" />
              </div>
              <span className="text-slate-500">
                {adults > 0 || children > 0
                  ? `Adults: ${adults} , Children: ${children}`
                  : "Travelers"}
              </span>
            </Button>

            <div className="relative">
              <div
                className={`absolute top-full left-0 border border-slateGray rounded-lg outline-none lg:w-[300px] mt-2 w-full bg-white text-slateGray p-4 space-y-3 transition-all duration-800 ease-in-out ${
                  isPassengerListOpen
                    ? "opacity-100 max-h-[300px] -translate-y-0 duration-500 ease-out"
                    : "opacity-0 hidden pointer-events-none max-h-0 -translate-y-2 duration-300 ease-in"
                }     overflow-hidden transition-all z-20`}
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
                    <span className="w-5 text-sm text-center">{adults}</span>
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
                    <span className="w-5 text-sm text-center">{children}</span>

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
      </div>
      <div className="flex gap-4 justify-end">
      <Button
          type="button"
          className="mt-14 bg-white/75 backdrop-blur-sm border-[0.5px] border-black before:top-0 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-white/65 before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base"
          onClick={handleResetSearch}
        >
          <Trash size={20} />
        </Button>

        <Button
          type="button"
          className="mt-14 bg-white/75 backdrop-blur-sm border-[0.5px] border-black before:top-0 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-white/65 before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </>
  );
};

export default FlightComponent;
