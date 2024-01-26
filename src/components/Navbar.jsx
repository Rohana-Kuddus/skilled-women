import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../redux/slices/alertSlice"
import MenuLineIcon from "remixicon-react/MenuLineIcon";
import Logo from "../assets/logo.svg";
import Alert from "./Alert";
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
  const [isRegistered, setRegistered] = useState(false);
  const [userProfile, setProfile] = useState(null);

  // ketika user klik tombol Coba Sekarang seharusnya foto profil tidak langsung ditampilkan, tunggu user register/login
  const handleRegister = () => {
    setRegistered(true);
    setProfile("https://dummyimage.com/400x400/000/fff.jpg&text=User+Profile");
  };

  // alert
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.alert);

  const alert = {
    status: false,
    text: 'Apa kamu yakin ingin keluar?',
    button: {
      primary: 'keluar',
        primaryAction: () => dispatch(setStatus(false)),
      secondary: 'Batal',
        secondaryAction: () => dispatch(setStatus(false))
    },
  };

  // ketika user klik tombol keluar, tampilan navbar seharusnya tidak langsung berubah, tunggu komponen alert
  const handleLogout = () => {
    dispatch(setStatus(true));
    setRegistered(false);
 };

  return (
    <>
      <nav className="flex items-center p-4 flex-wrap border-b-4">
        {/* LOGO */}
        <Link to="/" className="top-0 p-2 mx-2 inline-flex items-center">
          <img src={Logo} alt="skilldwomen_logo" className="w-60 logo"/>
        </Link>
        {/* ICON MENU */}
        <button
          onClick={handleToggle}
          className="text-white inline-flex p-3 rounded lg:hidden ml-auto mr-4 hover:text-white outline-none"
        >
          <MenuLineIcon color="#4F6C6A" />
        </button>
        {/* NAVIGATION BAR */}
        {isOpen && (
          <div className={`top-navbar lg:inline-flex lg:flex-grow lg:w-auto" ${isOpen ? "" : "opacity-0 scale-0"}`}
          >
            <div className="navSmall lg:inline-flex lg:flex-row lg:ml-auto mx-1 lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
              <NavLink
                to="/"
                className="navlink lg:inline-flex lg:w-auto w-full mx-1 px-4 py-2 rounded items-center justify-center hover:text-white"
              >
                Home
              </NavLink>
              <NavLink
                to="/jobs"
                className="navlink lg:inline-flex lg:w-auto w-full mx-1 px-4 py-2 rounded items-center justify-center hover:text-white"
              >
                Pekerjaan
              </NavLink>
              <NavLink
                to="/about"
                className="navlink lg:inline-flex lg:w-auto w-full mx-1 px-4 py-2 rounded items-center justify-center hover:text-white"
              >
                Tentang Kami
              </NavLink>
              <NavLink
                to="/faq"
                className="navlink lg:inline-flex lg:w-auto w-full mx-1 px-4 py-2 rounded items-center justify-center hover:text-white"
              >
                FAQ
              </NavLink>

              {isRegistered ? (
                <div className="lg:inline-flex">
                  <NavLink to="/profiles/:id" className="userNav">
                    <img
                      src={userProfile}
                      alt="User Profile"
                      className="user-profile rounded-full w-11 h-auto mx-1"
                    />
                  </NavLink>
                  <NavLink
                    to="/"
                    onClick={handleLogout}
                    className="active navlink lg:inline-flex lg:w-auto w-full mx-1 px-4 py-2 rounded items-center justify-center hover:text-white"
                  >
                    Keluar
                  </NavLink>
                </div>
              ) : (
                <NavLink
                  to="/register"
                  onClick={handleRegister}
                  className="active navlink lg:inline-flex lg:w-auto w-full mx-1 mr-4 px-4 py-2 rounded items-center justify-center hover:text-white"
                >
                  Coba Sekarang
                </NavLink>
              )}
            </div>
          </div>
        )}
      </nav>
      {status && <Alert status={alert.status} text={alert.text} button={alert.button}></Alert>}
    </>
  );
}

export default Navbar;