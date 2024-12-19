import React, { useState, useEffect } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { store, AppDispatch, RootState } from "../redux/store";
import {
  fetchWeather,
  setDestination,
  clearDestination,
  resetWeather,
} from "../redux/slices/weatherSlice";

import { Trash, Sun, Warning } from "@phosphor-icons/react";
import { ModalComponent } from "./ModalComponent";

import WeatherResults from "./WeatherResults";

const WeatherComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    //@ts-expect-error: Unused variable warning
    data: weather,
    status,
    //@ts-expect-error: Unused variable warning
    error,
  } = useSelector((state: RootState) => state.weather);

  const [selectedCityName, setSelectedCityName] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    description: string;
    confirmText: string;
  } | null>(null);

  const handleResetSearch = () => {
    dispatch(clearDestination());
    dispatch(resetWeather());
    setSelectedCityName("");
  };

  useState(() => {
    handleResetSearch();
  });

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSelectedCityName(value);
    dispatch(setDestination(value));
  };

  const handleSearch = async () => {
    const state = store.getState();
    const destination = state.weather.destination ?? "";
    console.log("CITY: ", destination);

    const requiredFields = [{ field: destination, name: "City" }];

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

    try {
      await dispatch(fetchWeather({ destination: destination })).unwrap();
    } catch (error: any) {
      console.error(error.message || "An error occured while fetching weather");
    }
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
        <div className="flex flex-col gap-4 md:flex-row md:gap-4">
          <div>
            <Input
              containerClass="relative"
              inputClass="border border-slateGray rounded-lg outline-none lg:w-[300px] md:w-[360.2px] w-full h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1 cursor-pointer"
              type="text"
              placeholder="City"
              value={selectedCityName}
              onChange={handleDestinationChange}
              onClick={() => {
                setSelectedCityName("");
              }}
            >
              <div className="absolute text-white top-3.5 left-3">
                <Sun size={20} color="slateGray" weight="regular" />
              </div>
            </Input>
          </div>
          <div className="relative w-full">
            <div className="block lg:absolute sm:block w-full lg:w-fit sm:w-full -top-32 right-80 left-60">
              <WeatherResults />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[50px]"></div>
      <div className="flex gap-4 lg:justify-end sm:justify-center md:justify-end justify-center">
        <Button
          type="button"
          onClick={handleResetSearch}
          className="mt-14 bg-white/75 backdrop-blur-sm border-[0.5px] border-black before:top-0 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-white/65 before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base"
        >
          <Trash size={20} />
        </Button>
        <Button
          onClick={handleSearch}
          type="button"
          className={`mt-14 bg-white/75 backdrop-blur-sm border-[0.5px] border-black before:top-0 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-white/65 before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base ${
            isLoadingData ? "opacity-50 cursor-not-allowed" : ""
          }`}
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

export default WeatherComponent;
