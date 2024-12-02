import React, { useState, useEffect } from "react";
import { Text } from "../Text";
import { Fade, Slide } from "react-awesome-reveal";
import { Button } from "../Button";
import { HeroTexts, Countries } from "../../data/DataLists";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { opensignupmodal } from "../../redux/slices/modalSignupSlice";

const HeroSection = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  console.log('IS LOGGED IN: ', isLoggedIn);
  const [randomCountry, setRandomCountry] = useState<string>('');
  const heroText = HeroTexts[0];

  const dispatch = useDispatch();

  const getRandomCountry = () => {
  const randomIndex = Math.floor(Math.random() * Countries.length);
  setRandomCountry(Countries[randomIndex]);
}

  useEffect(() => {
    getRandomCountry();
    const intervalId = setInterval(getRandomCountry, 3000);

    return () => clearInterval(intervalId);
  },[])

  const handleSignUpModal = () => {
    console.log("Sign-up Modal");
    dispatch(opensignupmodal());
  }

  return (
    <>
    <section id="home" className="w-full lg:h-screen md:h-[550px] h-[830px] relative overflow-x-hidden flex justify-end font-poppins">
      <section className="w-full lg:h-screen md:h-[550px] h-[830] overflow-hidden relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="max-w-full max-h-full z-10 max-md:z-0"
          style={{ position: "absolute", bottom: "6%", right: "-3%" }}
        >
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="2" dy="2" result="offsetblur" />
              <feFlood floodColor="rgba(0, 0, 0, 0.5)" />
              <feComposite in2="offsetblur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            filter="url(#shadow)"
            height="1000"
            width="1000"
            transform="rotate(-10)"
            fill="#AEE1E1"
            d="M50,120 C30,110 20,90 40,80 C20,60 40,40 60,50 C70,30 100,20 120,40 C140,20 180,40 170,70 C190,80 190,120 160,110 C140,140 100,150 80,130 C70,150 50,140 50,120 Z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="max-w-full max-h-full max-md:mt-20"
          style={{ position: "absolute", top: "15%", right: "10%" }}
        >
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="2" dy="2" result="offsetblur" />
              <feFlood floodColor="rgba(0, 0, 0, 0.5)" />
              <feComposite in2="offsetblur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            filter="url(#shadow)"
            height="1000"
            width="1000"
            transform="rotate(-5)"
            fill="#D3E0DC"
            d="M50,120 C30,110 20,90 40,80 C20,60 40,40 60,50 C70,30 100,20 120,40 C140,20 180,40 170,70 C190,80 190,120 160,110 C140,140 100,150 80,130 C70,150 50,140 50,120 Z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          className="max-w-full max-h-full z-10 max-sm:w-80 max-md:w-2/3 max-md:h-2/3 max-sm:h-80 max-sm:-ml-24 max-md:-ml-28"
          style={{ position: "absolute", top: "30%", left: "55%" }}
        >
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
              <feOffset dx="2" dy="2" result="offsetblur" />
              <feFlood floodColor="rgba(0, 0, 0, 0.5)" />
              <feComposite in2="offsetblur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            filter="url(#shadow)"
            height="1000"
            width="1000"
            transform="rotate()"
            fill="#FCD1D1"
            className="shadow-md"
            d="M50,120 C30,110 20,90 40,80 C20,60 40,40 60,50 C70,30 100,20 120,40 C140,20 180,40 170,70 C190,80 190,120 160,110 C140,140 100,150 80,130 C70,150 50,140 50,120 Z"
          />
          <text x="53%" y="45%" transform="rotate(0)" textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="rgb(75 85 99)" style={{ fontSize: '8' }}>
            {randomCountry}?
          </text>
        </svg>

      </section>
      <main className="absolute top-0 max-sm:top-5 left-0 grid w-full h-auto px-5 pt-24 lg:h-full md:grid-cols-2 lg:px-24 md:px-24 md:pt-32 lg:pt-0">
        <div className="flex flex-col justify-center order-2 gap-3 md:gap-6 md:order-1">
          <Text
            as="p"
            className="text-sm max-sm:mb-2 max-md:mt-4 font-normal tracking-widest uppercase text-slateGray lg:text-base"
          >
            <Fade duration={2000}>
              {heroText.firstText}
            </Fade>
          </Text>
          <Text
            as="h1"
            className="text-3xl max-sm:mb-2 max-md:mt-2 font-medium text-gray-600 lg:text-7xl md:text-5xl"
          >
            <Slide direction="right" duration={1200}>
              {heroText.bigText}
            </Slide>
          </Text>
          <Text
            as="p"
            className="text-sm font-light max-sm:mb-4 max-md:mb-4 max-md:mt-2 text-justify text-gray-600 md:text-base"
          >
            <Fade duration={2000}>
              {heroText.secondText1}
            </Fade>
            <Fade duration={2000}>
              {heroText.secondText2}
            </Fade>
          </Text>
          <div className="flex items-center justify-between w-full gap-0 md:justify-start lg:gap-12 md:gap-6">
            {!isLoggedIn ? (
            <Button
            onClick={() => {
              handleSignUpModal();
            }}
            type="button"
            className="shadow-md px-5 py-3 text-white border-none rounded-1 outline-none lg:px-7 font-semibold bg-slateGray hover:shadow-none hover:bg-black hover:text-white hover:border-gray-950 transition-all duration-300 ease-in"
          >
            Sign up
          </Button>
            ) : null}

          </div>
        </div>
      </main>
    </section>
    </>
  );
};

export default HeroSection;