import React from "react";
import { NavLink } from "react-router-dom";
import { Slide } from "react-awesome-reveal";
import Logo from "../../assets/logo/logo.svg";
import { Image } from "../Image";
import { NavLinks } from "../Data/DataLists";
import { List } from "../List";

const NavBar = () => {
  return (
    <header className="">
      <Slide direction="down">
        <nav className="w-full md:h-24 bg-white lg:px-24 md:px-12 px-8 flex justify-between items-center">
          <Image
            as="a"
            href="/"
            className="h-8 md:h-10"
            image={Logo}
            alt="Logo"
          />
          <div className="items-center hidden gap-20 lg-flex">
            <ul className="flex items-center justify-center gap-0">
                
            </ul>
          </div>
        </nav>
      </Slide>
    </header>
  );
};

export default NavBar;


