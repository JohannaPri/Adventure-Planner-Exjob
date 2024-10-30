import React, { useState } from "react"
import { Text } from "../Text";
import { Input } from "../Input";
import { Button } from "../Button";
import { Select } from "../Select";
import { MagnifyingGlass, List, AirplaneTakeoff, AirplaneLanding } from '@phosphor-icons/react';
import Datepicker from "react-tailwindcss-datepicker";

type SearchType = "flight" | "accommodation" | "activities" | "weather"

interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

const LoggedIn = () => {
    const [searchType, setSearchType] = useState<SearchType>("flight");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const START_FROM = new Date();
    START_FROM.setMonth(START_FROM.getMonth() + 1);

    const MIN_DATE = new Date();
    MIN_DATE.setDate(MIN_DATE.getDate() +1);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
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
            })
        }

        console.log(value);
    }

    //
    const [adults, setAdults] = useState<number>(1);
    const [children, setChildren] = useState<number>(0);
    const [isPassengerListOpen, setIsPassengerListOpen] = useState<boolean>(false);

    const incrementAdults = () => setAdults(prev => Math.min(prev + 1, 10));
    const decrementAdults = () => setAdults(prev => Math.max(prev - 1, 1));

    const incrementChildren = () => setChildren(prev => Math.min(prev + 1, 10));
    const decrementChildren = () => setChildren(prev => Math.max(prev -1, 0));

    const togglePassengerSelector = () => setIsPassengerListOpen(prev => !prev);
    //

    
  return (
    <section
      className="w-full lg:h-screen md:h-[550px] h-[830px] relative overflow-x-hidden flex justify-end font-poppins"
      >
        <section className="flex justify-center items-center w-full lg:h-screen md:h-[550px] h-[830] overflow-hidden relative">
            <div className="w-full p-4 bg-gray-400 rounded-md shadow-md">
                <div className="flex space-x-4 mb-4">
                    <button onClick={() => setSearchType("flight")} className={`p-2 rounded ${searchType === "flight" ? "bg-green-400 text-white" : "bg-red-400"}`}>
                        Flight
                    </button>
                    <button onClick={() => setSearchType("accommodation")} className={`p-2 rounded ${searchType === "accommodation" ? "bg-green-400 text-white" : "bg-red-400"}`}>
                        Accommodation
                    </button>
                    <button onClick={() => setSearchType("activities")} className={`p-2 rounded ${searchType === "activities" ? "bg-green-400 text-white" : "bg-red-400"}`}>
                        Activities
                    </button>
                    <button onClick={() => setSearchType("weather")} className={`p-2 rounded ${searchType === "weather" ? "bg-green-400 text-white" : "bg-red-400"}`}>
                        Weather
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    { searchType === "flight" && (
                        <>  
                            <Select containerClass="relative" selectClass="border bg-white border-slateGray rounded-lg outline-none w-[300px] h-[50px] focus:outline-none text-slateGray pr-4 pl-4 py-1">
                                <option value="round-trip">Round-Trip</option>
                                <option value="one-way-trip">One-Way-Trip</option>
                            </Select>
                            <Input containerClass="relative" inputClass="border border-slateGray rounded-lg outline-none w-[300px] h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1" type="text" placeholder="Departure">
                                <div className="absolute top-4 left-3 text-white">
                                    <AirplaneTakeoff size={18} color="slateGray" weight="regular" />
                                </div>
                            </Input>
                            <Input containerClass="relative" inputClass="border border-slateGray rounded-lg outline-none w-[300px] h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1" type="text" placeholder="Destination">
                                <div className="absolute top-4 left-3 text-white">
                                    <AirplaneLanding size={18} color="slateGray" weight="regular" />
                                </div>
                            </Input>
                            <div>
                                <Button onClick={togglePassengerSelector} className="border p-2 bg-cloudGray text-white rounded">
                                    Travelers
                                </Button>
                                { isPassengerListOpen && (
                                    <div className="border border-slateGray bg-white rounded-lg outline-none w-[300px] h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1">
                                        <div>
                                            <label>Adults: </label>
                                            <button onClick={decrementAdults}>-</button>
                                            <span>{adults}</span>
                                            <button onClick={incrementAdults}>+</button>
                                        </div>
                                        <div>
                                        <label>Children: </label>
                                            <button onClick={decrementChildren}>-</button>
                                            <span>{children}</span>
                                            <button onClick={incrementChildren}>+</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Datepicker 
                                value={value} 
                                onChange={handleChange}
                                primaryColor={"sky"}
                                separator="to"
                                startFrom={START_FROM}
                                popoverDirection="up"
                                minDate={MIN_DATE}
                                displayFormat={"MM/DD/YYYY"}
                                readOnly
                                inputClassName="border border-slateGray rounded-lg outline-none w-[300px] h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1"
                            /> 
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
