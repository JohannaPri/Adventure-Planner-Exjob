import React, { useState, useRef, useEffect } from "react";
import { Input } from "./Input";
import { Button } from "./Button";

import { UserList, City, Mountains, Info, Trash } from "@phosphor-icons/react";
import { DatePickerComponent } from "./DatePickerComponent";
import { NotificationComponent } from "./NotificationComponent";

const ActivityComponent = () => {
  const [adults, setAdults] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);
  const [isPassengerListOpen, setIsPassengerListOpen] =
    useState<boolean>(false);

  const incrementAdults = () => setAdults((prev) => Math.min(prev + 1, 10));
  const decrementAdults = () => setAdults((prev) => Math.max(prev - 1, 0));

  const incrementChildren = () => setChildren((prev) => Math.min(prev + 1, 10));
  const decrementChildren = () => setChildren((prev) => Math.max(prev - 1, 0));

  const togglePassengerSelector = () => setIsPassengerListOpen((prev) => !prev);

  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [notificationContent, setNotificationContent] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const openNotification = (title: string, description: string) => {
    setNotificationContent({ title, description });
    setIsNotificationOpen(true);
  };

  const handleNotification = () => {
    openNotification(
      "Heads up, fellow traveler! 🌍",
      "This is a demo app powered by a test API, which means we can’t fetch data for every destination. For the full experience, make sure to search for London or New York—these are the stars of our show! 🌟 Some locations are still playing hard to get, but we’re working to bring them into the mix soon. On the bright side, we can fetch weather updates for any city or country, so you’ll always know what to pack. Thanks for your patience, and happy adventuring! 🗺️✨"
    );
  };

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

  return (
    <>
      <div className="space-y-4 relative w-full">
        <div className="flex flex-col gap-4 md:flex-row md:gap-4">
          <div className="relative">
            <Input
              containerClass="relative"
              inputClass="border border-slateGray rounded-lg outline-none lg:w-[300px] w-full h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1 cursor-pointer"
              type="text"
              placeholder="City"
            >
              <div className="absolute text-white top-3.5 left-3">
                <City size={20} color="slateGray" weight="regular" />
              </div>
            </Input>
          </div>
          <div className="relative">
            <Input
              containerClass="relative"
              inputClass="border border-slateGray rounded-lg outline-none lg:w-[300px] w-full h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1 cursor-pointer"
              type="text"
              placeholder="Find Activity"
            >
              <div className="absolute text-white top-3.5 left-3">
                <Mountains size={20} color="slateGray" weight="regular" />
              </div>
            </Input>
          </div>
          <div className="relative lg:w-[300px] sm:w-[100%] w-screen h-auto">
            <DatePickerComponent />
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
      <div className="mt-[50px]"></div>
      <div className="flex gap-4 justify-end">
        <Button
          type="button"
          className="mt-14 bg-white/75 backdrop-blur-sm border-[0.5px] border-black before:top-0 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-white/65 before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base"
        >
          <Trash size={20} />
        </Button>
        <Button
          type="button"
          className="mt-14 bg-white/75 backdrop-blur-sm border-[0.5px] border-black before:top-0 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-white/65 before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base"
        >
          Search
        </Button>
      </div>
      <div>
        <Button className="fixed bottom-6 cursor-pointer right-6 bg-slateGray w-14 h-14 shadow-sm shadow-slateGray text-white rounded-full flex items-center justify-center shadow-lg z-30 hover:bg-slate-400">
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

export default ActivityComponent;
