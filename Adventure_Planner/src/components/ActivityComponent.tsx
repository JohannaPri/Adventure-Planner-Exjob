import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { store, AppDispatch, RootState } from "../redux/store";
import { Input } from "./Input";
import { Button } from "./Button";
import { DatePickerSingleComponent } from "./DatePickerSingleComponent";
import {
  UserList,
  City,
  Mountains,
  Trash,
  Warning,
} from "@phosphor-icons/react";
import { fetchCities } from "../redux/slices/citySlice";
import { setCity } from "../redux/slices/citySlice";
import { CityQuery } from "../redux/slices/citySlice";
import { debounce } from "lodash";

import { fetchActivites } from "../redux/slices/activitySlice";
import {
  setDestination,
  setDate,
  setAdults,
  setChildren,
  clearDestination,
  resetActivites,
} from "../redux/slices/activitySlice";
import { ModalComponent } from "./ModalComponent";

interface SuggestionsDropdownProps {
  suggestions: string[];
  onSelect: (value: string) => void;
  position: { top: number; left: number; width: number };
}

const ActivityComponent: React.FC = () => {
  const { data: activityData, status } = useSelector(
    (state: RootState) => state.activity
  );

  console.log("ActivityData: ", activityData);

  const dispatch = useDispatch<AppDispatch>();

  const [adultsLocal, setAdultsLocal] = useState<number>(0);
  const [childrenLocal, setChildrenLocal] = useState<number>(0);
  const [isPassengerListOpen, setIsPassengerListOpen] =
    useState<boolean>(false);

  const cityInputRef = useRef<HTMLInputElement | null>(null);

  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  //@ts-expect-error: Unused variable warning
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const [resetDatePicker, setResetDatePicker] = useState<boolean>(false);

  const [hasSelectedDestination, setHasSelectedDestination] =
    useState<boolean>(false);

  const citySuggestionsRef = useRef<HTMLUListElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    description: string;
    confirmText: string;
  } | null>(null);

  const incrementAdults = () => {
    setAdultsLocal((prev) => Math.min(prev + 1, 10));
    dispatch(setAdults(adultsLocal + 1));
  };
  const decrementAdults = () => {
    setAdultsLocal((prev) => Math.max(prev - 1, 0));
    dispatch(setAdults(adultsLocal - 1));
  };

  const incrementChildren = () => {
    setChildrenLocal((prev) => Math.min(prev + 1, 10));
    dispatch(setChildren(childrenLocal + 1));
  };

  const decrementChildren = () => {
    setChildrenLocal((prev) => Math.max(prev - 1, 0));
    dispatch(setChildren(childrenLocal - 1));
  };

  const togglePassengerSelector = () => setIsPassengerListOpen((prev) => !prev);

  const [selectedCityName, setSelectedCityName] = useState<string>("");
  //@ts-expect-error: Unused variable warning
  const [citiesLoading, setCitiesLoading] = useState<boolean>(false);

  const cityData = useSelector((state: RootState) => state.city.data);
  const [activeInput, setActiveInput] = useState<"destination" | null>(null);

  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  /**
   * Sets the position of the dropdown based on the position of the input field.
   * @param inputRef The reference to the input element.
   * @param inputType The type of input field (destination).
   */

  const handleInputFocus = (
    inputRef: React.RefObject<HTMLInputElement>,
    inputType: "destination"
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

  /**
   * Handles the city selection by updating the state and Redux store.
   * @param cityName The name of the selected city.
   */

  const handleCitySelect = (cityName: string) => {
    const matchedCity = cityData?.find((city) => city.city_full === cityName);

    if (matchedCity) {
      if (activeInput === "destination") {
        setSelectedCityName(cityName);
        setHasSelectedDestination(true);
        console.log("City Name: ", matchedCity.city);
        dispatch(setCity(matchedCity.city));
      }
    }
    setCitySuggestions([]);
    setDropdownPosition(null);
  };

  /**
   * Handles changes to the destination input field.
   * @param event The change event from the input.
   */

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSelectedCityName(value);
    if (value.length >= 3) {
      debouncedFetchCities(value);
    }
  };

  /**
   * A debounced function to fetch cities from the API.
   * @param input The search input used for fetching cities.
   */

  const debouncedFetchCities = useCallback(
    debounce(async (input: string) => {
      if (input) {
        setCitiesLoading(true);
        const cityQuery: CityQuery = {
          destination: input,
        };
        await dispatch(fetchCities(cityQuery));
        dispatch(setCity(input));
        setCitiesLoading(false);
      }
    }, 500),
    [dispatch]
  );

  /**
   * Handle date change in the date picker.
   * @param fromDate The selected date.
   */

  const handleDateChange = (fromDate: string) => {
    console.log(fromDate);
    dispatch(setDate(fromDate));
  };

  useEffect(() => {
    if (Array.isArray(cityData)) {
      const suggestions = cityData.map((cities) => cities.city_full || "");
      setCitySuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setCitySuggestions([]);
      setShowSuggestions(false);
    }
  }, [cityData]);

  const START_FROM = new Date();
  START_FROM.setMonth(START_FROM.getMonth() + 1);

  const MIN_DATE = new Date();
  MIN_DATE.setDate(MIN_DATE.getDate() + 1);

  interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
  }

  const [value, setValue] = useState<DateRange>({
    startDate: new Date(),
    endDate: null,
  });
  //@ts-expect-error: Unused variable warning
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
        citySuggestionsRef.current &&
        !citySuggestionsRef.current?.contains(event.target)
      ) {
        setDropdownPosition(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideInput);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideInput);
    };
  }, []);

  const handleClearCity = () => {
    setSelectedCityName("");
    setCitySuggestions([]);
    setHasSelectedDestination(false);
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
        <ul className="overflow-y-auto max-h-60" ref={citySuggestionsRef}>
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

  const handleSearch = async () => {
    const state = store.getState();
    const destination = state.city.destination || "";
    const date = state.activity.date || "";
    const adults = state.activity.adults ?? 0;
    const children = state.activity.children ?? 0;

    console.log("destination: ", destination);

    const requiredFields = [
      { field: destination, name: "City" },
      { field: date, name: "Date" },
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
      destination,
      date,
      adults,
      children,
    };

    const modifiedRequestParams = {
      ...requestParams,
      destinationInput: selectedCityName,
    };

    localStorage.setItem(
      "storedActivityData",
      JSON.stringify(modifiedRequestParams)
    );

    try {
      await dispatch(fetchActivites(requestParams)).unwrap();
    } catch (error: any) {
      console.error(error.message || "An error occured while fetching flights");
    }
  };

  useEffect(() => {
    const storedActivityData = localStorage.getItem("storedActivityData");
    if (storedActivityData) {
      const data = JSON.parse(storedActivityData);
      setSelectedCityName(data.destinationInput);
      setAdultsLocal(data.adults);
      setChildrenLocal(data.children);

      dispatch(setCity(data.destination));
      dispatch(setDestination(data.destination));
      dispatch(setAdults(data.adults));
      dispatch(setChildren(data.children));

      setHasSelectedDestination(true);
    }
  }, []);

  const handleResetSearch = () => {
    setAdultsLocal(0);
    setChildrenLocal(0);
    setIsPassengerListOpen(false);
    dispatch(setAdults(0));
    dispatch(setChildren(0));
    setSelectedCityName("");

    dispatch(clearDestination());
    dispatch(resetActivites());

    dispatch(setCity(""));
    dispatch(setDestination(""));
    dispatch(setAdults(0));
    dispatch(setChildren(0));

    localStorage.removeItem("storedActivityData");

    setIsPassengerListOpen(false);
    setCitySuggestions([]);

    if (cityInputRef.current) cityInputRef.current.focus();

    setResetDatePicker(true);
    setTimeout(() => setResetDatePicker(false), 0);
    setHasSelectedDestination(false);
  };

  const isLoadingData = status === "loading" ? true : false;

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
        <div className="flex flex-col lg:flex-row sm:flex-col md:flex-col gap-4 md:gap-4">
          <div className="relative">
            <Input
              ref={cityInputRef}
              containerClass="relative"
              inputClass="border border-slateGray rounded-lg outline-none lg:w-[300px] md:w-[360.2px] w-full h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1 cursor-pointer"
              type="text"
              placeholder="City"
              onChange={handleDestinationChange}
              value={selectedCityName}
              onFocus={() => handleInputFocus(cityInputRef, "destination")}
              onClick={() => {
                setCitySuggestions([]);
              }}
            >
              <div className="absolute text-white top-3.5 left-3">
                <City size={20} color="slateGray" weight="regular" />
              </div>
              {hasSelectedDestination && selectedCityName && (
                <div className="w-full absolute top-1/2 left-9 transform -translate-y-1/2 flex items-center space-x-2 bg-gray-200 px-3 py-1 rounded-full max-w-[87%] lg:max-w-[252px] sm:max-w-[87%] md:max-w-[314px] justify-between overflow-hidden">
                  <span className="overflow-hidden text-slateGray text-ellipsis whitespace-nowrap">
                    {selectedCityName.length > 20
                      ? `${selectedCityName.slice(0, 25)}...`
                      : selectedCityName}
                  </span>
                  <button
                    onClick={handleClearCity}
                    className="text-sm cursor-pointer text-slateGray"
                  >
                    &times;
                  </button>
                </div>
              )}
            </Input>
            {citySuggestions.length > 0 &&
              dropdownPosition &&
              activeInput === "destination" && (
                <SuggestionsDropdown
                  suggestions={citySuggestions}
                  onSelect={handleCitySelect}
                  position={dropdownPosition}
                />
              )}
          </div>
          <div className="relative">
            <Input
              containerClass="relative"
              inputClass="border border-slateGray rounded-lg outline-none lg:w-[300px] md:w-[360.2px] w-full h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1 cursor-pointer"
              type="text"
              disabled={true}
              placeholder="Find Activity"
            >
              <div className="absolute text-white top-3.5 left-3">
                <Mountains size={20} color="slateGray" weight="regular" />
              </div>
            </Input>
          </div>
          <div className="relative lg:w-[300px] sm:w-[100%] w-screen h-auto max-w-fit">
            <DatePickerSingleComponent
              reset={resetDatePicker}
              onDateChange={handleDateChange}
            />
          </div>
          <div ref={passengerRef} className="relative">
            <Button
              onClick={togglePassengerSelector}
              className="border border-slateGray bg-white text-slateGray rounded-lg lg:w-[300px] md:w-[360.2px] w-full h-[50px] p-2 flex items-center justify-start"
            >
              <div className="mr-2">
                <UserList size={20} color="slateGray" weight="regular" />
              </div>
              <span className="text-slate-500">
                {adultsLocal > 0 || childrenLocal > 0
                  ? `Adults: ${adultsLocal} , Children: ${childrenLocal}`
                  : "Participants"}
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
                    <span className="w-5 text-sm text-center">
                      {adultsLocal}
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
                      {childrenLocal}
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
      </div>
      <div className="mt-[50px]"></div>
      <div className="flex gap-4 lg:justify-end sm:justify-center md:justify-end justify-center">
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

export default ActivityComponent;
