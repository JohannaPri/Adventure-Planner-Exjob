import { Text } from "../Text";
import { Fade } from "react-awesome-reveal";
import { Card } from "../Cards";

const ServicesSection = () => {
  const cardsData = [
    {
      firstText: "Flights",
      secondText: "We help you take off on your next adventure by easily searching for flights to your favorite destinations. Discover the best deals and find the perfect itinerary that fits your travel plans, whether it’s a quick escape or a dream vacation.",
    },
    {
      firstText: "Accommodation",
      secondText: "We help you find the ideal place to stay by searching a variety of accommodations. Whether you prefer a cozy hotel or a luxurious resort, we make it easy to discover options that fit your style and budget.",
    },
    {
      firstText: "Activities",
      secondText: "We help you create unforgettable experiences with activities that cater to all tastes, whether you crave an adrenaline rush, a relaxing spa retreat, or a delightful culinary adventure.",
    },
    {
      firstText: "Weather",
      secondText: "We help you discover ideal destinations based on your preferred weather, ensuring that every trip aligns with your dreams, whether it’s sunny beaches or cozy retreats.",
    },
  ];

  return (
    <>
      <section id="services" className="relative flex flex-col items-center justify-center w-full h-full px-6 lg:px-24 md:px-20 font-poppins">
        <main className="flex flex-col items-center justify-center w-full gap-3 pt-32">
          <Text
            as="p"
            className="text-sm font-normal tracking-widest uppercase text-slateGray lg:text-base"
          >
            <Fade duration={2000}>Our Services</Fade>
          </Text>
          <div className="z-20 grid w-full h-auto px-8 my-12 lg:grid-cols-4 md:grid-cols-2 lg:gap-7 md:gap-10 gap-7 md:px-0">
            {cardsData.map((card, index) => (
                <Card
                    cardClass="drop-shadow w-full bg-cloudGray flex flex-col items-center justify-center py-6 cursor-pointer transition duration-300 hover:shadow-xl px-5 rounded-xl"
                    imageWrapperClass=""
                    cover="object-cover"
                    imageAlt=""
                    imageSrc="none"
                    textWrapperClass="w-full flex flex-col items-center gap-2 flex-grow"
                    key={index}
                >
                    <Text as="h4" className="text-base font-medium rounded text-slateGray whitespace-nowrap">{card.firstText}</Text>
                    <Text as="p" className="text-sm font-light text-center text-slateGray">{card.secondText}</Text>
                </Card>
            ))}
          </div>
        </main>
      </section>
    </>
  );
};

export default ServicesSection;
