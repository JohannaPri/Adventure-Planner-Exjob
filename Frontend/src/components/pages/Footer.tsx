import { Image } from "../Image";
import { Text } from "../Text";
import Logo from "../../assets/logo/logo.svg";
import { HeroTexts, FooterTexts } from "../../data/DataLists";
import { useNavigate } from "react-router-dom";
import { List } from "../List";
import { Slide } from "react-awesome-reveal";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react";

const Footer = () => {
  const navigate = useNavigate();
  const heroText = HeroTexts[0];

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="footer" className="flex flex-col w-full bg-cloudGray">
      <section className="grid w-full h-auto px-6 py-16 lg:grid-cols-5 md:grid-cols-3 lg:px-20 md:px-12 gap-7 md:gap-4 lg:gap-0">
        <div className="flex flex-col items-center gap-4 px-4 justify-center lg:px-4 md:px-4">
          <Slide direction="down">
            <div className="sm:px-20 lg:px-9 px-24 flex justify-center">
              <Image
                className="w-36 md:h-15 cursor-pointer"
                onClick={() => scrollToSection("home")}
                image={Logo}
                alt="Logo"
              />
            </div>
          </Slide>
          <blockquote className="max-w-md text-lg italic font-semibold text-slateGray mt-4 relative text-center">
            <div className="absolute top-0 left-0">
              <svg
                className="w-3 h-3 text-slateGray"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 14"
              >
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
              </svg>
            </div>

            <Text
              className="text-sm text-slateGray font-poppins mt-4 italic text-center"
              as="p"
            >
              {heroText.bigText}
            </Text>

            <div className="absolute top-10 -right-1 transform -translate-x-1/2">
              <svg
                className="w-3 h-3 text-slateGray"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 14"
              >
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
              </svg>
            </div>
          </blockquote>
        </div>

        <div className="flex flex-col gap-4 md:items-center md:mt-8 font-poppins">
          <Text className="text-xl text-slateGray" as="h2">
            {FooterTexts.quickLinks.caption}
          </Text>
          <ul className="flex flex-col gap-2 md:ml-2 cursor-pointer">
            {FooterTexts.quickLinks.links.map((link, index) => (
              <List key={index} className="text-sm">
                <div
                  onClick={() => scrollToSection(link.url)}
                  className="transition-all duration-300 text-slateGray hover:underline"
                >
                  {link.name}
                </div>
              </List>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:items-center md:mt-8 font-poppins">
          <Text className="text-xl text-slateGray" as="h2">
            {FooterTexts.contacts.caption}
          </Text>
          <ul className="flex flex-col gap-2 md:ml-11 cursor-pointer">
            {FooterTexts.contacts.links.map((link, index) => (
              <List key={index} className="text-sm">
                <div
                  onClick={() => navigate(link.url)}
                  className="transition-all duration-300 text-slateGray hover:underline"
                >
                  {link.name}
                </div>
              </List>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:items-center md:mt-8 font-poppins">
          <Text className="text-xl text-slateGray" as="h2">
            {FooterTexts.more.caption}
          </Text>
          <ul className="flex flex-col gap-2 md:ml-8 cursor-pointer">
            {FooterTexts.more.links.map((link, index) => (
              <List key={index} className="text-sm">
                <div
                  onClick={() => navigate(link.url)}
                  className="transition-all duration-300 text-slateGray hover:underline"
                >
                  {link.name}
                </div>
              </List>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 lg:items-center md:mt-8">
          <ul className="flex items-center w-full gap-4 lg:justify-center max-sm:justify-center">
            <List>
              <div
                onClick={() => navigate("/")}
                className="text-slateGray border-[1px] border-white p-2.5 flex rounded-full transition-all duration-300 ease-in hover:bg-cloudGray2 hover:text-black cursor-pointer"
              >
                <FacebookLogo size={24} color="currentColor" weight="fill" />
              </div>
            </List>
            <List>
              <div
                onClick={() => navigate("/")}
                className="text-slateGray border-[1px] border-white p-2.5 flex rounded-full transition-all duration-300 ease-in hover:bg-cloudGray2 hover:text-black cursor-pointer"
              >
                <InstagramLogo size={24} color="currentColor" weight="fill" />
              </div>
            </List>
            <List>
              <div
                onClick={() => navigate("/")}
                className="text-slateGray border-[1px] border-white p-2.5 flex rounded-full transition-all duration-300 ease-in hover:bg-cloudGray2 hover:text-black cursor-pointer"
              >
                <LinkedinLogo size={24} color="currentColor" weight="fill" />
              </div>
            </List>
            <List>
              <div
                onClick={() => navigate("/")}
                className="text-slateGray border-[1px] border-white p-2.5 flex rounded-full transition-all duration-300 ease-in hover:bg-cloudGray2 hover:text-black cursor-pointer"
              >
                <XLogo size={24} color="currentColor" weight="fill" />
              </div>
            </List>
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
