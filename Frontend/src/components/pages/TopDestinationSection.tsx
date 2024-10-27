import { useCallback, useRef } from "react";
import Slider from "react-slick";
import { Fade  } from "react-awesome-reveal";
import { Text } from "../Text";
import { Button } from "../Button";
import { Card } from "../Cards";
import City1 from "../../assets/topDestinations/city1.jpg";
import City2 from "../../assets/topDestinations/city2.jpg";
import City3 from "../../assets/topDestinations/city3.jpg";
import City4 from "../../assets/topDestinations/city4.jpg";
import City5 from "../../assets/topDestinations/city5.jpg";
import City6 from "../../assets/topDestinations/city6.jpg";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { TopDestinationTexts } from "../Data/DataLists";

const TopDestinationSection = () => {
    const sliderRef = useRef<Slider | null>();

    const next = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    }

    const previous = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    dots: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
    };

    const renderCities = useCallback((element: number) => {
        switch (element) {
            case 0:
                return City1;
            case 1:
                return City2;
            case 2:
                return City3;
            case 3:
                return City4;
            case 4:
                return City5;
            case 5:
                return City6;
            default:
                return "";
        }
    }, [])

    return (
        <section id="top-destinations" className="relative flex flex-col items-center justify-center w-full h-screen px-6 my-20 lg:px-24 md:px-20">
            <main className="flex flex-col items-center justify-center w-full gap-3 pt-0">
          <Text
            as="p"
            className="text-sm font-normal tracking-widest uppercase text-slateGray lg:text-base"
          >
            <Fade duration={2000}>Top Destinations</Fade>
          </Text>

          <div className="flex items-center justify-end w-full gap-5 px-3 mt-12 md:px-6">
                <Button onClick={previous} className="p-2 border-none rounded-full outline-none cursor-pointer bg-cloudGray text-slateGray hover:bg-cloudGray2 hover:text-black" type="button">
                    <CaretLeft size={18} color="currentColor" weight="fill" />
                </Button>
                <Button onClick={next} className="p-2 border-none rounded-full outline-none cursor-pointer bg-cloudGray text-slateGray hover:bg-cloudGray2 hover:text-black" type="button">
                    <CaretRight size={18} color="currentColor" weight="fill" />
                </Button>
          </div>

          <div className="w-full h-auto mt-4">
          <Slider ref={(slider) => (sliderRef.current = slider)} {...settings}>
                {
                    TopDestinationTexts.cards.map((card, index) => (
                        <div key={index} className="px-3 md:px-6">
                            <Card cardClass="overflow-hidden shadow-md rounded-lg cursor-default group" imageAlt={card.country} imageSrc={renderCities(index)} imageWrapperClass="w-full h-[250px] overflow-hidden" cover="group-hover:scale-125 transition duration-500 ease" textWrapperClass="flex flex-col gap-4 w-full px-5 py-5">
                                <div className="flex items-center justify-between">
                                    <Text as="h4" className="text-deepSlate font-medium">
                                        {card.city}, {card.country}
                                    </Text>
                                </div>
                            </Card>
                        </div>
                    ))
                }
            </Slider>
          </div>
          </main>
        </section>
    )
}

export default TopDestinationSection