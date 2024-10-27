import { Text } from "../Text";
import { Input } from "../Input";
import { Button } from "../Button";
import { Envelope } from '@phosphor-icons/react'
import { NewsLetterTexts } from "../Data/DataLists";
import { Slide, AttentionSeeker } from "react-awesome-reveal";


const NewsLetterSection = () => {
    return (
        <section className="w-full my-32 flex justify-between relative items-start h-[400px] font-poppins">
            <div className="w-full border-t-2 border-b-2 border-cloudGray2 h-[100%] absolute flex flex-col items-center justify-center md:gap-16 gap-10 px-5">
                <Text
            as="h1"
            className="text-2xl font-medium text-gray-600 lg:text-5xl md:text-5xl"
          >
            <Slide direction="right" duration={1200}>
              {NewsLetterTexts.firstText1}
            </Slide>
          </Text>
                <Text as="h2" className="lg:text-xl md:text-xl text-xl text-center text-slateGray lg:w-3/5 w-full">
                    {NewsLetterTexts.firstText2}
                </Text>
                <form className="flex md:flex-row flex-col items-stretch gap-2">
                    <Input containerClass="relative" inputClass="border border-slateGray rounded-lg outline-none w-[300px] h-[50px] focus:outline-none text-slateGray pr-4 pl-9 py-1" type="email" placeholder={NewsLetterTexts.placeholderText}>
                        <div className="absolute top-4 left-3 text-white">
                            <Envelope size={18} color="slateGray" weight="fill" />
                        </div>
                    </Input>
                    <AttentionSeeker effect="headShake" delay={1000} duration={1500}>
                        <Button type="submit" className="w-full shadow-md px-5 py-3 text-white border border-slateGray rounded-lg outline-none lg:px-7 font-extralight bg-slateGray hover:shadow-none hover:bg-black hover:text-white hover:border-black transition-all duration-300 ease-in">
                            {NewsLetterTexts.buttonText}
                        </Button>
                    </AttentionSeeker>
                </form>
            </div>
        </section>
    )
}

export default NewsLetterSection