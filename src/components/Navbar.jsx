import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../redux/slices/alertSlice"
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
  const { alert, alertName } = useSelector(state => state.alert);
  const { user } = useSelector(state => state.user);
  const [cookies] = useCookies();
  const [isOpen, setOpen] = useState(window.innerWidth >= 931); // change the navbar view based on device size
  const location = useLocation();

  const resizeNav = () => {
    window.innerWidth >= 931 ? setOpen(true) : setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeNav);
    return () => {
      window.removeEventListener("resize", resizeNav);
    };
  }, []);

  const isActive = (routePath) => {
    return location.pathname === routePath;
  };
  

  useEffect(() => {
    if (Object.keys(cookies).length !== 0) {
      dispatch(getUserProfile(cookies.token));
    };
  }, [cookies]);

  const handleToggle = () => {
    setOpen(!isOpen);
  };

  const alertObj = {
    status: false,
    text: 'Apakah Anda yakin ingin keluar?',
    button: {
      primary: 'Keluar',
      primaryAction: () => {
        dispatch(logoutUser());
        dispatch(setAlert({ alert: false, alertName: 'logout' }));
        navigate('/');
      },
      secondary: 'Batal',
      secondaryAction: () => dispatch(setAlert({ alert: false, alertName: 'logout' }))
    },
  };

  return (
    <div>
      <nav className="navbarContent">
        {/* LOGO */}
        <Link to="/" className="top-0 p-2 mx-2 inline-flex items-center">
          <img src={Logo} alt="skilldwomen_logo" className="logo" />
        </Link>

        {/* ICON MENU */}
        <button onClick={handleToggle} className="burgerIcon">
          <MenuLineIcon color="#4F6C6A" />
        </button>

        {/* NAVIGATION BAR */}
        {isOpen && (
          <div className={`${isOpen ? "" : "opacity-0 scale-0"} navbarSection`}>
            {/* belum dibuat hover */}
            <div className="navbar">
              <p className={`navlink ${isActive('/') ? 'active' : ''}`} onClick={() => navigate('/')}>Home</p >
              <p className={`navlink ${isActive('/jobs') ? 'active' : ''}`} onClick={() => navigate('/jobs')}>Pekerjaan</p >
              <p className={`navlink ${isActive('/about') ? 'active' : ''}`} onClick={() => navigate('/about')}>Tentang Kami</p >
              <p className={`navlink ${isActive('/faq') ? 'active' : ''}`} onClick={() => navigate('/faq')}>FAQ</p >

              {Object.keys(cookies).length !== 0 ?
                <div className="flex items-center">
                  <img
                    src={user.image ? user.image : 'https://dummyimage.com/400x400/000/fff.jpg&text=User+Profile'} 
                    alt="User Profile" className="user-profile" onClick={() => navigate(`/profiles/${user.id}`)} />
                  <ButtonPrimary buttonText="Keluar" onClick={() => dispatch(setAlert({ alert: true, alertName: 'logout' }))} 
                    margin="my-0"></ButtonPrimary>
                </div>
                : <ButtonPrimary buttonText="Coba Sekarang" onClick={() => navigate('/register')} margin="my-0 ml-0 md:ml-4"></ButtonPrimary>}
            </div>
          </div>
        )}
      </nav>

      {alert && alertName === 'logout' && <Alert status={alertObj.status} text={alertObj.text} button={alertObj.button}></Alert>}
    </div>
  );
}

export default Navbar;