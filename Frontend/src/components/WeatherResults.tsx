import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Sun } from "@phosphor-icons/react";

const WeatherResults: React.FC = () => {

  const { data: weatherData, status, error, destination } = useSelector(
    (state: RootState) => state.weather
  );

  if (status === "loading") {
    return (
      <div className="text-center transition max-w-[300px] min-h-[317px] p-4 mx-auto text-black shadow-2xl shadow-black rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-r to-orange-50 from-orange-200 opacity-85 rounded-lg z-0"></div>
        <div className="relative z-5">
          <h2 className="text-xl md:text-2xl font-semibold text-slateGray mb-4">
            Hang tight—your weather update is brewing! 🌞🌧️{" "}
          </h2>
          <p className="text-gray-700 text-base md:text-lg">
            Just checking if you’ll need sunscreen or an umbrella. Hang
            tight—sunny skies or cozy rain is just a moment away!
          </p>
        </div>
      </div>
    );
  } else if (status === "failed") {
    return (
      <div className="text-center transition duration-300 max-w-[300px] min-h-[317px] p-4 mx-auto text-black shadow-2xl shadow-black rounded-lg">
        <div className="absolute inset-0 bg-gradient-to-r to-orange-50 from-orange-200 opacity-85 rounded-lg z-0"></div>
        <div className="relative z-5">
          <h2 className="text-xl md:text-2xl font-semibold text-slateGray mb-4">
            Oops, no weather updates! 🌧️🤔
          </h2>
          <p className="text-gray-700 text-base md:text-lg">
            Looks like the clouds are keeping secrets today. Try refreshing or
            adjusting your location to get the latest scoop on the skies!
          </p>
        </div>
      </div>
    );
  } else if (status === "succeeded") {
  } else {
    
  }

  console.log('FLIGHDATA: ', status === "succeeded");
  const hasSearched = status === "succeeded";

  if (hasSearched  && (!weatherData || weatherData.length === 0)) {
    return <div className="text-center transition duration-300 max-w-[300px] max-h-[317px] p-4 mx-auto text-black shadow-2xl shadow-black rounded-lg">
    <div className="absolute inset-0 bg-gradient-to-r to-orange-50 from-orange-200 opacity-85 rounded-lg z-0"></div>
    <div className="relative z-5">
    <h2 className="text-xl md:text-2xl font-semibold text-slateGray mb-4">
      Oops, no weather updates! 🌧️🤔 
    </h2>
    <p className="text-gray-700 text-base md:text-lg">
    Looks like the clouds are keeping secrets today. Try refreshing or adjusting your location to get the latest scoop on the skies!
    </p>
    </div>
  </div>
  }

  const dateBuilder = () => {
    let d = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <>
    {weatherData?.map((weather, index) => (
    <div key={index} className="text-center transition duration-300 min-w-[300px] h-[317px] min-h-[317px] max-h-[317px] p-4 mx-auto text-black shadow-2xl shadow-black rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-r to-orange-50 from-orange-200 opacity-85 rounded-lg z-0"></div>
      <div className="relative z-5">
      <div className="font-semibold text-xl text-shadow">{weather.name}, {weather.sys.country}</div>
      <div className="text-sm text-shadow">{dateBuilder()}</div>
      <div className="bg-white w-fit p-4 pl-5 pr-5 m-4 mx-auto rounded-xl font-bold text-3xl bg-opacity-70 shadow-md shadow-gray-800 text-shadow tracking-wide">{Math.round(weather.main.temp)}°c</div>
      <div className="icon">
        <img className="mx-auto" src={`https://openweathermap.org/img/wn/${weather.weather.icon}.png`} alt="Weathericon" />
      </div>
      <div className="text-xs font-medium tracking-wide uppercase p-1">{weather.weather.main} ({weather.weather.description})</div>
      <div className="text-xs font-medium tracking-wide uppercase p-1">Humidity: {weather.main.humidity}%</div>
      <div className="text-xs font-medium tracking-wide uppercase p-1">Windspeed: {weather.wind.speed}m/s</div>
      </div>
    </div>
    ))}
    </>
  )
};

export default WeatherResults;