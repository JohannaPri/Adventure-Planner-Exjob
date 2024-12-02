import React, { useState, useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "../redux/store";
import { fetchAirports } from "../redux/slices/airportSlice";
import {
  fetchFlights,
  setDeparture,
  setDestination,
  clearDeparture,
  clearDestination,
  setDateFrom,
  setDateTo,
  resetFlights,
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
  Path,
  Warning,
} from "@phosphor-icons/react";
import { DatePickerComponent } from "./DatePickerComponent";
import { ModalComponent } from "./ModalComponent";

interface SuggestionsDropdownProps {
  suggestions: string[];
  onSelect: (value: string) => void;
  position: { top: number; left: number; width: number };
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
  const flightDataStatus = useSelector(
    (state: RootState) => state.flights.status
  );
  //@ts-expect-error: Unused variable warning
  const [departureCity, setDepartureCity] = useState<string | null>(null);
  //@ts-expect-error: Unused variable warning
  const [destinationCity, setDestinationCity] = useState<string | null>(null);

  const [adults, setAdults] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);
  const [isPassengerListOpen, setIsPassengerListOpen] =
    useState<boolean>(false);
  //@ts-expect-error: Unused variable warning  
  const [airportsLoading, setAirportsLoading] = useState<boolean>(false);
  //@ts-expect-error: Unused variable warning
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const [resetDatePicker, setResetDatePicker] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    description: string;
    confirmText: string;
  } | null>(null);

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

  const dateFrom = useSelector((state: RootState) => state.flights.dateFrom);
  const dateTo = useSelector((state: RootState) => state.flights.dateTo);
  useSelector((state: RootState) => state.flights);
  //@ts-expect-error: Unused variable warning
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
      const suggestions = airportData.map(
        (airport) => airport.displayname || ""
      );
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
        className="bg-white border border-gray-300 rounded-lg shadow-lg"
      >
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
  };

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

    const requiredFields = [
      { field: departure, name: "Departure" },
      { field: destination, name: "Destination" },
      { field: dateFrom, name: "Start Date" },
      { field: dateTo, name: "End Date" },
      { field: adults > 0, name: "Adults" },
    ];

    const missingFields = requiredFields.filter((f) => !f.field);

    const openModal = (
      title: string,
      description: string,
      confirmText: string
    ) => {
      setModalContent({ title, description, confirmText });
      setIsModalOpen(true);
    };

    if (missingFields.length > 0) {
      openModal(
        "Oops! Your adventure needs some details!",
        `Missing fields: ${missingFields.map((f) => f.name).join(", ")}`,
        "Okay, I got it!"
      );
      console.log(
        `Missing fields: ${missingFields.map((f) => f.name).join(", ")}`
      );
      return;
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

    const modifiedRequestParams = {
      ...requestParams,
      departureInput: localDeparture,
      destinationInput: localDestination,
    };

    localStorage.setItem(
      "storedFlightData",
      JSON.stringify(modifiedRequestParams)
    );

    try {
      await dispatch(fetchFlights(requestParams)).unwrap();
    } catch (error: any) {
      console.error(error.message || "An error occured while fetching flights");
    }
  };

  useEffect(() => {
    const storedFlightData = localStorage.getItem("storedFlightData");
    if (storedFlightData) {
      const data = JSON.parse(storedFlightData);
      setLocalDeparture(data.departureInput);
      dispatch(setDeparture(data.departure));
      dispatch(fetchAirports(data.departure));
      setLocalDestination(data.destinationInput);
      dispatch(setDestination(data.destination));
      dispatch(fetchAirports(data.destination));
      setAdults(data.adults);
      setChildren(data.children);
      setHasSelectedDeparture(true);
      setHasSelectedDestination(true);
    }
  }, []);

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
    setAirportSuggestions([]);

    dispatch(clearDeparture());
    dispatch(clearDestination());
    dispatch(setDateFrom(""));
    dispatch(setDateTo(""));
    dispatch(resetFlights());
    localStorage.removeItem("storedFlightData");

    setIsPassengerListOpen(false);

    if (departureInputRef.current) departureInputRef.current.focus();

    setResetDatePicker(true);
    setTimeout(() => setResetDatePicker(false), 0);
  };

  const passengerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        passengerRef.current &&
        !passengerRef.current.contains(event.target)
      ) {
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
    };
  }, []);

  const isLoadingData = flightDataStatus === "loading" ? true : false;
  //@ts-expect-error: Unused variable warning
  const tripChoices = [
    { value: "round-trip", label: "Round-Trip" },
    { value: "one-way-trip", label: "One-Way-Trip" },
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  return (
    <>
      <div
        className={`space-y-4 relative w-full transition-all ease-in-out ${
          isVisible ? "animate-fade-in-long" : "opacity-0"
        }`}
      >
        <Select
          containerClass="relative"
          selectClass="focus:outline-none pl-9 border bg-white border-slateGray rounded-lg outline-none lg:w-[300px] w-full h-[50px] focus:outline-none text-slateGray pr-8 pl-4 py-1 cursor-pointer appearance-none"
        >
          <option value="round-trip">Round-Trip</option>
          <option value="one-way-trip" disabled={true}>
            One-Way-Trip
          </option>
        </Select>

        <div className="absolute left-3 top-2 transform -translate-y-1/2 pointer-events-none">
          <Path size={20} color="slateGray" weight="regular" />
        </div>

        <div
          id="pil"
          className="absolute left-64 top-2.5 transform -translate-y-1/2 pointer-events-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>

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
              onClick={() => setAirportSuggestions([])}
            >
              <div className="absolute text-white top-4 left-3">
                <AirplaneTakeoff size={20} color="slateGray" weight="regular" />
              </div>

              {hasSelectedDeparture && localDeparture && (
                <div className="w-full absolute top-1/2 left-9 transform -translate-y-1/2 flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full max-w-[252px] justify-between overflow-hidden">
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
            {airportSuggestions.length > 0 &&
              dropdownPosition &&
              activeInput === "departure" && (
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
              onFocus={() =>
                handleInputFocus(destinationInputRef, "destination")
              }
              onChange={handleDestinationChange}
              containerClass="relative"
              inputClass="border border-slateGray rounded-lg outline-none lg:w-[300px] w-full h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1 cursor-pointer"
              type="text"
              placeholder="Destination (min 3 letters)"
              value={localDestination}
              onClick={() => setAirportSuggestions([])}
            >
              <div className="absolute text-white top-4 left-3">
                <AirplaneLanding size={20} color="slateGray" weight="regular" />
              </div>

              {hasSelectedDestination && localDestination && (
                <div className="w-full absolute top-1/2 left-9 transform -translate-y-1/2 flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full max-w-[252px] justify-between overflow-hidden">
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
            {airportSuggestions.length > 0 &&
              dropdownPosition &&
              activeInput === "destination" && (
                <SuggestionsDropdown
                  suggestions={airportSuggestions}
                  onSelect={handleAirportSelect}
                  position={dropdownPosition}
                />
              )}
          </div>

          <div className="relative lg:w-[300px] sm:w-[100%] w-screen h-auto">
            <DatePickerComponent
              reset={resetDatePicker}
              onDateChange={handleDateChange}
            />
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
          className={`mt-14 bg-white/75 backdrop-blur-sm border-[0.5px] border-black before:top-0 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-white/65 before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base ${
            isLoadingData ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      {isModalOpen && modalContent && (
        <ModalComponent
          title={modalContent.title}
          description={modalContent.description}
          confirmText={modalContent.confirmText}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => setIsModalOpen(false)}
          icon={<Warning size={60} />}
        />
      )}
    </>
  );
};

export default FlightComponent;
