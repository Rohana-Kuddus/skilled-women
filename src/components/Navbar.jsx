import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MenuLineIcon from "remixicon-react/MenuLineIcon";
import Logo from "../assets/logo.svg";
import "../index.css";
import "../styles/components/Navbar.css";

function Navbar() {
  // change the navbar view based on device size
  const [isOpen, setOpen] = useState(window.innerWidth >= 1024);
  const resizeNav = () => {
    window.innerWidth >= 1024 ? setOpen(true) : setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeNav);
    return () => {
      window.removeEventListener("resize", resizeNav);
    };
  }, []);

  const handleToggle = () => {
    setOpen(!isOpen);
  };

  // check if the user has registered/login --> show user profile
  // the register state should be false
  const [isRegistered, setRegistered] = useState(true);
  const [userProfile, setProfile] = useState(null);

  const handleRegister = () => {
    setRegistered(true);
    setProfile("https://dummyimage.com/400x400/000/fff.jpg&text=User+Profile");
  };

  return (
    <>
      <nav className="flex items-center p-4 flex-wrap shadow-md">
        {/* LOGO */}
        <Link to="/" className="top-0 p-2 mx-2 inline-flex items-center">
          {/* <Logo alt="skilled-women_logo" /> */}
          LOGO
        </Link>
        {/* ICON MENU */}
        <button
          onClick={handleToggle}
          class="text-white inline-flex p-3 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggle"
        >
          <MenuLineIcon color="##4F6C6A" />
        </button>
        {/* NAVIGATION BAR */}
        {isOpen && (
          <div
            className={`top-navbar transition-all duration-500 ease-in-out lg:inline-flex lg:flex-grow lg:w-auto" ${
              isOpen ? "" : "opacity-0 scale-0"
            }`}
          >
            <div className="navSmall lg:inline-flex lg:flex-row lg:ml-auto mx-2 lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
              <NavLink
                to="/"
                className="navlink lg:inline-flex lg:w-auto w-full mx-2 px-4 py-2 rounded items-center justify-center hover:text-white"
              >
                Home
              </NavLink>
              <NavLink
                to="/jobs"
                className="navlink lg:inline-flex lg:w-auto w-full mx-2 px-4 py-2 rounded items-center justify-center hover:text-white"
              >
                Pekerjaan
              </NavLink>
              <NavLink
                to="/about"
                className="navlink lg:inline-flex lg:w-auto w-full mx-2 px-4 py-2 rounded items-center justify-center hover:text-white"
              >
                Tentang Kami
              </NavLink>
              <NavLink
                to="/faq"
                className="navlink lg:inline-flex lg:w-auto w-full mx-2 px-4 py-2 rounded items-center justify-center hover:text-white"
              >
                FAQ
              </NavLink>

              {isRegistered ? (
                <div className="lg:inline-flex">
                  <NavLink to="/profiles/:id" className="userNav">
                    <img
                      src={userProfile}
                      alt="User Profile"
                      className="user-profile rounded-xxl"
                    />
                  </NavLink>
                  <NavLink
                    to=""
                    onClick={""}
                    className="active navlink lg:inline-flex lg:w-auto w-full mx-2 px-4 py-2 rounded items-center justify-center hover:text-white"
                  >
                    Keluar
                  </NavLink>
                </div>
              ) : (
                <NavLink
                  to="/register"
                  onClick={handleRegister}
                  className="active navlink lg:inline-flex lg:w-auto w-full mx-2 px-4 py-2 rounded items-center justify-center hover:text-white"
                >
                  Coba Sekarang
                </NavLink>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;