import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Slide } from "react-awesome-reveal";
import Logo from "../../assets/logo/logo.svg";
import { Image } from "../Image";
import { Button } from "../Button";
import { NavButtons, NavLinks } from "../../data/DataLists";
import { List } from "../List";
import { ArrowCircleRight, CirclesFour } from "@phosphor-icons/react";

const NavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setOpen(!open);
  }

  const handleClickMenuItem = (item: string) => {
    handleToggleMenu();
    scrollToSection(item);
  }

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [navBarColor, setNavBarColor] = useState<boolean>(false);

  const listenScrollEvent = () => {
    window.scrollY < 10 ? setNavBarColor(false) : setNavBarColor(true);
  }

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    }
  }, []);


  return (
    <header className="fixed top-0 left-0 z-50 w-full h-auto overflow-x-hidden bg-transparent">
      <Slide direction="down">
        <nav className={`w-full md:h-24 h-20 ${navBarColor ? "bg-white" : "bg-white bg-opacity-70"} lg:px-24 md:px-12 px-8 flex justify-between items-center`}>
          <Image
            as="a"
            onClick={() => scrollToSection("home")}
            className="h-8 md:h-10 cursor-pointer"
            image={Logo}
            alt="Logo"
          />
          <div className="items-center hidden gap-20 lg:flex font-poppins font-light">
            <ul className="flex items-center justify-center gap-8">
                {
                  NavLinks.map((navlink, index) => (
                    <List className="w-full text-base" key={index}>
                        <NavLink to={''} onClick={() => scrollToSection(navlink.url)} className="relative inline-block overflow-hidden mt-2 whitespace-nowrap ml-4 hover:border-b-gray-950 hover:border-b">{navlink.name}</NavLink>
                    </List>
                  ))
                }
            </ul>
            <ul className="flex items-center justify-center gap-6">
                {
                  NavButtons.map((navbutton, index) => (
                    <List className="w-full" key={index}>
                      <Button onClick={() => navigate(navbutton.url)} type="button" className={`${navbutton.name == "Signup" ? "border-2 border-gray-950 before:top-0" : "before:bottom-0 border-b-2 border-transparent hover:border-gray-950"} py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-cloudGray before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base`}>{navbutton.name}</Button>
                    </List>
                  ))
                }
            </ul>
          </div>
          <div className="flex items-center gap-4 lg:hidden">
            <div className="cursor-pointer hamburger text-slateGray" onClick={handleToggleMenu}>
              <CirclesFour size={30} color="slateGray" weight="fill" /></div>
          </div>
        </nav>
      </Slide>
      { /* Mobile Nav */ }
      <nav className={`font-poppins flex justify-end lg:hidden h-screen w-full bg-slateGray/90 fixed top-0 ${open ? "right-0" : "-right-[120vw]"} transition-all duration-500 ease-out`}>
          <div className={`w-[70%] h-screen bg-white flex flex-col justify-between items-center relative ${open ? "right-0" : "-right-[120px]"} transition-all duration-500 ease-out delay-300`}>
                <section className="flex flex-col w-full gap-16 px-4 py-6">
                  <div className="flex items-center justify-between w-full">
                    <Image as="a" href="/" className="h-8 md:h-10" image={Logo} alt="Logo" />
                    <div className="cursor-pointer hamburger text-slateGray" onClick={handleToggleMenu}>
                      <ArrowCircleRight size={30} color="slateGray" weight="fill" />
                    </div>
                  </div>
                  <ul className="flex flex-col gap-3 pl-2">
                      {
                        NavLinks.map((navlink, index) => (
                          <List className="w-full text-base" key={index}>
                            <NavLink to={''} onClick={() => handleClickMenuItem(navlink.url)} className="relative inline-block overflow-hidden pt-2 whitespace-nowrap pl-4">{navlink.name}</NavLink>
                          </List>
                        ))
                      }
                  </ul>
                </section>
                <ul className="flex items-center justify-center w-full gap-4 pb-24">
                  {
                    NavButtons.map((navbutton, index) => (
                      <List className="w-auto" key={index}>
                        <Button onClick={() => navigate(navbutton.url)} type="button" className={`${navbutton.name == "Signup" ? "border-2 border-gray-950 before:top-0" : "before:bottom-0 border-b-2 border-transparent hover:border-gray-950"} py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-cloudGray before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base`}>{navbutton.name}</Button>
                      </List>
                    ))
                  }
                </ul>
          </div>
      </nav>
    </header>
  );
};

export default NavBar;