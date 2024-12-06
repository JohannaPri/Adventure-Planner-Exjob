import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Slide } from "react-awesome-reveal";
import Logo from "../../assets/logo/logo.svg";
import { Image } from "../Image";
import { ArrowCircleRight, CirclesFour } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getAuth, signOut } from "firebase/auth";
import { signOutUser } from "../../redux/slices/authSlice";
import { opensignupmodal } from "../../redux/slices/modalSignupSlice";
import { opensigninmodal } from "../../redux/slices/modalSigninSlice";

interface NavBarProps {
  isLoggedIn: boolean;
}

const NavBar: React.FC<NavBarProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const [open, setOpen] = useState<boolean>(false);

  const [activeSection, setActiveSection] = useState<string>("");

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(signOutUser());
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleSignInModal = () => {
    console.log("Sign-in modal");
    dispatch(opensigninmodal());
  };

  const handleSignUpModal = () => {
    console.log("Sign-up Modal");
    dispatch(opensignupmodal());
  };

  const handleToggleMenu = () => {
    setOpen(!open);
  };

  const scrollToSectionMobile = (id: string) => {
    setActiveSection(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      handleToggleMenu();
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToTopMobile = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    handleToggleMenu();
  };

  const [navBarColor, setNavBarColor] = useState<boolean>(false);

  const listenScrollEvent = () => {
    window.scrollY < 10 ? setNavBarColor(false) : setNavBarColor(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full h-auto overflow-x-hidden bg-transparent">
      <Slide direction="down">
        <nav
          className={`w-full md:h-24 h-20 ${
            navBarColor ? "bg-white" : "bg-white bg-opacity-70"
          } lg:px-24 md:px-12 px-8 flex justify-between items-center`}
        >
          {isLoggedIn ? (
            <Image
              as="a"
              onClick={() => {
                navigate("/");
                scrollToTop();
              }}
              className="h-8 md:h-10 cursor-pointer"
              image={Logo}
              alt="Logo"
            />
          ) : (
            <Image
              as="a"
              onClick={() => {
                scrollToSection("home");
                scrollToTop();
              }}
              className="h-8 md:h-10 cursor-pointer"
              image={Logo}
              alt="Logo"
            />
          )}
          <div className="items-center hidden gap-20 lg:flex font-poppins font-light">
            {isLoggedIn ? (
              <>
                <ul className="flex items-center justify-center gap-8">
                  <li className="w-full text-base">
                    <NavLink
                      to="/"
                      onClick={scrollToTop}
                      className="relative inline-block overflow-hidden mt-2 whitespace-nowrap ml-4 hover:border-b-gray-950 hover:border-b"
                    >
                      Home
                    </NavLink>
                  </li>

                  <li className="w-full text-base">
                    <NavLink
                      to="/search"
                      onClick={scrollToTop}
                      className="relative inline-block overflow-hidden mt-2 whitespace-nowrap ml-4 hover:border-b-gray-950 hover:border-b"
                    >
                      Search
                    </NavLink>
                  </li>

                  <li className="w-full text-base">
                    <NavLink
                      to="/my-adventures"
                      onClick={scrollToTop}
                      className="relative inline-block overflow-hidden mt-2 whitespace-nowrap ml-4 hover:border-b-gray-950 hover:border-b"
                    >
                      My Adventures
                    </NavLink>
                  </li>

                  <li className="w-full text-base">
                    <NavLink
                      to="footer"
                      className="relative inline-block overflow-hidden mt-2 whitespace-nowrap ml-4 hover:border-b-gray-950 hover:border-b"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("footer");
                      }}
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul className="flex items-center justify-center gap-8">
                  <li className="w-full text-base">
                    <NavLink
                      to="#"
                      className={`relative inline-block overflow-hidden mt-2 whitespace-nowrap ml-4 hover:border-b-gray-950 hover:border-b ${
                        activeSection === "home" ? "font-medium" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("home");
                      }}
                    >
                      Home
                    </NavLink>
                  </li>

                  <li className="w-full text-base">
                    <NavLink
                      to="#"
                      className={`relative inline-block overflow-hidden mt-2 whitespace-nowrap ml-4 hover:border-b-gray-950 hover:border-b ${
                        activeSection === "services" ? "font-medium" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("services");
                      }}
                    >
                      Services
                    </NavLink>
                  </li>

                  <li className="w-full text-base">
                    <NavLink
                      to="#"
                      className={`relative inline-block overflow-hidden mt-2 whitespace-nowrap ml-4 hover:border-b-gray-950 hover:border-b ${
                        activeSection === "top-destinations"
                          ? "font-medium"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("top-destinations");
                      }}
                    >
                      Top Destinations
                    </NavLink>
                  </li>

                  <li className="w-full text-base">
                    <NavLink
                      to="#"
                      className={`relative inline-block overflow-hidden mt-2 whitespace-nowrap ml-4 hover:border-b-gray-950 hover:border-b ${
                        activeSection === "footer" ? "font-medium" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("footer");
                      }}
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </>
            )}
            <ul className="flex items-center justify-center gap-6">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/profile");
                    }}
                    className="w-[139px] h-[44px] before:bottom-0 border-b-2 border-transparent hover:border-gray-950 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-cloudGray before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      handleSignOut();
                    }}
                    className="w-[139px] h-[44px] whitespace-nowrap border-2 border-gray-950 before:top-0 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-cloudGray before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSignUpModal}
                    className="w-[139px] h-[44px] before:bottom-0 border-b-2 border-transparent hover:border-gray-950 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-cloudGray before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={handleSignInModal}
                    className="w-[139px] h-[44px] whitespace-nowrap border-2 border-gray-950 before:top-0 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-cloudGray before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in text-base"
                  >
                    Sign In
                  </button>
                </>
              )}
            </ul>
          </div>
          <div className="flex items-center gap-4 lg:hidden">
            <div
              className="cursor-pointer hamburger text-slateGray"
              onClick={handleToggleMenu}
            >
              <CirclesFour size={30} color="slateGray" weight="fill" />
            </div>
          </div>
        </nav>
      </Slide>

      {/* Mobile Nav */}
      <nav
        className={`font-poppins flex justify-end lg:hidden h-screen w-full bg-slateGray/90 fixed top-0 ${
          open ? "right-0" : "-right-[120vw]"
        } transition-all duration-500 ease-out`}
      >
        <div
          className={`w-[70%] h-screen bg-white flex flex-col justify-between items-center relative ${
            open ? "right-0" : "-right-[120px]"
          } transition-all duration-500 ease-out delay-300`}
        >
          <section className="flex flex-col w-full gap-16 px-4 py-6">
            <div className="flex items-center justify-between w-full">
              <Image
                as="a"
                href="/"
                className="h-8 md:h-10"
                image={Logo}
                alt="Logo"
              />
              <div
                className="cursor-pointer hamburger text-slateGray"
                onClick={handleToggleMenu}
              >
                <ArrowCircleRight size={30} color="slateGray" weight="fill" />
              </div>
            </div>
            <ul className="flex flex-col gap-3 pl-2">
              {isLoggedIn ? (
                <>
                  <li className="w-full text-base">
                    <NavLink
                      to={"/"}
                      onClick={() => scrollToTopMobile()}
                      className="relative inline-block overflow-hidden pt-2 whitespace-nowrap pl-4"
                    >
                      Home
                    </NavLink>
                  </li>

                  <li className="w-full text-base">
                    <NavLink
                      to={"/search"}
                      onClick={() => scrollToTopMobile()}
                      className="relative inline-block overflow-hidden pt-2 whitespace-nowrap pl-4"
                    >
                      Search
                    </NavLink>
                  </li>

                  <li className="w-full text-base">
                    <NavLink
                      to={"/my-destinations"}
                      onClick={() => scrollToTopMobile()}
                      className="relative inline-block overflow-hidden pt-2 whitespace-nowrap pl-4"
                    >
                      My Destinations
                    </NavLink>
                  </li>

                  <li className="w-full text-base">
                    <NavLink
                      to={"#"}
                      onClick={() => scrollToSectionMobile("footer")}
                      className="relative inline-block overflow-hidden pt-2 whitespace-nowrap pl-4"
                    >
                      Contact
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="w-full text-base">
                    <NavLink
                      to={"#"}
                      onClick={() => scrollToSectionMobile("home")}
                      className="relative inline-block overflow-hidden pt-2 whitespace-nowrap pl-4"
                    >
                      Home
                    </NavLink>
                  </li>

                  <li className="w-full text-base">
                    <NavLink
                      to={"#"}
                      onClick={() => scrollToSectionMobile("services")}
                      className="relative inline-block overflow-hidden pt-2 whitespace-nowrap pl-4"
                    >
                      Services
                    </NavLink>
                  </li>

                  <li className="w-full text-base">
                    <NavLink
                      to={"#"}
                      onClick={() => scrollToSectionMobile("top-destinations")}
                      className="relative inline-block overflow-hidden pt-2 whitespace-nowrap pl-4"
                    >
                      Top Destinations
                    </NavLink>
                  </li>

                  <li className="w-full text-base">
                    <NavLink
                      to={"#"}
                      onClick={() => scrollToSectionMobile("footer")}
                      className="relative inline-block overflow-hidden pt-2 whitespace-nowrap pl-4"
                    >
                      Contact
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </section>
          <ul className="flex items-center justify-center w-full gap-4 pb-24">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    navigate("/profile");
                    handleToggleMenu();
                  }}
                  className="text-sm w-[139px] h-[44px] before:bottom-0 border-b-2 border-transparent hover:border-gray-950 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-cloudGray before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in"
                >
                  My Profile
                </button>
                <button
                  onClick={() => {
                    handleSignOut();
                    handleToggleMenu();
                  }}
                  className="text-sm w-[139px] h-[44px] whitespace-nowrap border-2 border-gray-950 before:top-0 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-cloudGray before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    handleSignUpModal();
                    handleToggleMenu();
                  }}
                  className="text-sm w-[139px] h-[44px] before:bottom-0 border-b-2 border-transparent hover:border-gray-950 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-cloudGray before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    handleSignInModal();
                    handleToggleMenu();
                  }}
                  className="text-sm w-[139px] h-[44px] whitespace-nowrap border-2 border-gray-950 before:top-0 py-2 px-8 relative z-10 before:content-[''] before:absolute before:left-0 before:w-full before:h-0 before:bg-cloudGray before:-z-10 hover:before:h-full before:transition-all before:duration-300 before:ease-in"
                >
                  Sign In
                </button>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
