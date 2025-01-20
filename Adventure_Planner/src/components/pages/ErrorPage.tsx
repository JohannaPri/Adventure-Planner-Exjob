import { Image } from "../Image";
import { Button } from "../Button";
import { Empty, EmptyDescription, EmptyImage, EmptyTitle } from "keep-react";
import { useNavigate } from "react-router-dom";

const EmptyComponent = () => {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="w-full lg:h-screen md:h-[550px] h-[830px] relative overflow-x-hidden flex justify-end font-poppins"
    >
      <Empty>
        <EmptyImage>
          <Image
            image="https://staticmania.cdn.prismic.io/staticmania/aa469681-b2d1-4384-a990-91906711a24d_Property+1%3DNight+sky_+Property+2%3DSm.svg"
            className="h-[234px] w-[350px"
            alt="404"
          />
        </EmptyImage>
        <EmptyTitle className="mb-[14px] mt-5 text-center sm:justify-center">
          404 - Lost in the Journey 🌍
        </EmptyTitle>
        <EmptyDescription className="mb-8">
          Oops! It seems you've wandered off the beaten path. The page you're
          looking for isn’t here, but don’t worry—every great adventure has a
          few wrong turns.
        </EmptyDescription>
        <Button
          type="button"
          className="px-5 py-3 text-white transition-all duration-300 ease-in border-none shadow-md outline-none rounded-1 lg:px-7 font-extralight bg-slateGray hover:shadow-none hover:bg-black hover:text-white hover:border-gray-950"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Empty>
    </section>
  );
};

export default EmptyComponent;
