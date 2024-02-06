import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../redux/slices/alertSlice"
import MenuLineIcon from "remixicon-react/MenuLineIcon";
import Logo from "../assets/logo.svg";
import Alert from "./Alert";
import "../index.css";
import "../styles/components/Navbar.css";
import { useCookies } from "react-cookie";
import { logoutUser } from "../redux/slices/authSlice";
import ButtonPrimary from "./ButtonPrimary";
import { getUserProfile } from "../redux/slices/userSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.alert);
  const [cookies] = useCookies();
  const { user } = useSelector(state => state.user);
  const [isOpen, setOpen] = useState(window.innerWidth >= 1024); // change the navbar view based on device size

  const resizeNav = () => {
    window.innerWidth >= 1024 ? setOpen(true) : setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeNav);
    return () => {
      window.removeEventListener("resize", resizeNav);
    };
  }, []);

  useEffect(() => {
    if (Object.keys(cookies).length !== 0) {
      dispatch(getUserProfile(cookies.token));
    };
  }, [user]);

  const handleToggle = () => {
    setOpen(!isOpen);
  };

  const alert = {
    status: false,
    text: 'Apakah Anda yakin ingin keluar?',
    button: {
      primary: 'Keluar',
      primaryAction: () => {
        dispatch(logoutUser());
        dispatch(setStatus(false));
      },
      secondary: 'Batal',
      secondaryAction: () => dispatch(setStatus(false))
    },
  };

  return (
    <div>
      <nav className="flex items-center justify-between p-4 flex-wrap bg-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        {/* LOGO */}
        <Link to="/" className="top-0 p-2 mx-2 inline-flex items-center">
          <img src={Logo} alt="skilldwomen_logo" className="w-60 logo" />
        </Link>

        {/* ICON MENU */}
        <button onClick={handleToggle} className="text-white inline-flex p-3 rounded
          lg:hidden ml-auto mr-4 hover:text-white outline-none">
          <MenuLineIcon color="#4F6C6A" />
        </button>

        {/* NAVIGATION BAR */}
        {isOpen && (
          <div className={`${isOpen ? "" : "opacity-0 scale-0"}`}>
            {/* belum dibuat hover */}
            <div className="flex items-center justify-end mr-4">
              <p className="paragraph-regular dark mx-4" onClick={() => navigate('/')}>Home</p >
              <p className="paragraph-regular dark mx-4" onClick={() => navigate('/jobs')}>Pekerjaan</p >
              <p className="paragraph-regular dark mx-4" onClick={() => navigate('/about')}>Tentang Kami</p >
              <p className="paragraph-regular dark mx-4" onClick={() => navigate('/faq')}>FAQ</p >

              {Object.keys(cookies).length !== 0 ?
                <div className="flex">
                  <img
                    src={user.image ? user.image : 'https://dummyimage.com/400x400/000/fff.jpg&text=User+Profile'} 
                    alt="User Profile" className="user-profile rounded-full w-10 h-10 mx-4" onClick={() => navigate('/profiles/:id')} />
                  <ButtonPrimary buttonText="Keluar" onClick={() => dispatch(setStatus(true))} margin="my-0"></ButtonPrimary>
                </div>
                : <ButtonPrimary buttonText="Coba Sekarang" onClick={() => navigate('/register')} margin="my-0 ml-4"></ButtonPrimary>}
            </div>
          </div>
        )}
      </nav>

      {status && <Alert status={alert.status} text={alert.text} button={alert.button}></Alert>}
    </div>
  );
}

export default Navbar;