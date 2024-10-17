import { Image } from "../Image";
import bgImage from "../../assets/background/background-image.png";

const HeroSection = () => {
    return (
        <section className="w-full lg:h-screen md:h-[550px] h-[830] relative overflow-x-hidden flex justify-end">
           <Image className="opacity-65 h-[60%] w-[80%] lg:h-[90%] md:h-[50vh] lg:w-1/2 md:w-[55%]" image={bgImage} alt="Hero Image Background" />
        </section>
    )
}

export default HeroSection