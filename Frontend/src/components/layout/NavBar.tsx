import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Slide } from "react-awesome-reveal";
import Logo from "../../assets/logo/logo.svg";
import { Image } from "../Image";
import { Button } from "../Button";
import { NavButtons, NavLinks } from "../Data/DataLists";
import { List } from "../List";

const NavBar = () => {
  const navigate = useNavigate();

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
            className="h-8 md:h-10"
            image={Logo}
            alt="Logo"
          />
          <div className="items-center hidden gap-20 lg:flex font-poppins font-light">
            <ul className="flex items-center justify-center gap-8">
                {
                  NavLinks.map((navlink, index) => (
                    <List className="w-full text-base" key={index}>
                        <NavLink to={''} onClick={() => scrollToSection(navlink.url)} className="relative inline-block overflow-hidden pt-2 whitespace-nowrap pl-4">{navlink.name}</NavLink>
                    </List>
                  ))
                }
            </ul>
            <ul className="flex items-center justify-center gap-6">
                {
                  NavButtons.map((navbutton, index) => (
                    <List className="w-full" key={index}>
                      <Button onClick={() => navigate(navbutton.url)} type="button" className={`${navbutton.name == "Signup" ? "border-2 border-gray-950 before:top-0" : "before:bottom-0 border-b-2 border-transparent hover:border-gray-950"} py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-gray-200 before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base`}>{navbutton.name}</Button>
                    </List>
                  ))
                }
            </ul>
          </div>
        </nav>
      </Slide>
    </header>
  );
};

export default NavBar;