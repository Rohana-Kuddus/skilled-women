import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../redux/slices/alertSlice"
import MenuLineIcon from "remixicon-react/MenuLineIcon";
import Alert from "./Alert";
import "../styles/components/SidebarProfile.css";
import "../index.css";
import { logoutUser } from "../redux/slices/authSlice";
import PropTypes from "prop-types";

function SidebarProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { alert, alertName } = useSelector(state => state.alert);
  const [isOpen, setOpen] = useState(window.innerWidth >= 768);
  const { user } = useSelector(state => state.user);

  // adjust open and close sidebar based on screen size
  const resizeSidebar = () => {
    window.innerWidth >= 768 ? setOpen(true) : setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeSidebar);
    return () => {
      window.removeEventListener("resize", resizeSidebar);
    };
  }, []);

  // handle sidebar button
  const handleToggle = () => {
    setOpen(!isOpen);
  };
  const handleBlur = () => {
    setOpen(false);
  };

  const alertObj = {
    status: false,
    text: 'Apakah Anda yakin ingin keluar?',
    button: {
      primary: 'Keluar',
      primaryAction: () => {
        dispatch(logoutUser());
        dispatch(setAlert({ alert: false, alertName: 'signout' }));
        navigate('/');
      },
      secondary: 'Batal',
      secondaryAction: () => dispatch(setAlert({ alert: false, alertName: 'signout' }))
    }
  };

  return (
    <div>
      <div>
        <button onBlur={handleBlur} onClick={handleToggle} className="burgerBtn">
          <MenuLineIcon color="#4F6C6A" />
        </button>
        {isOpen && (
          <aside className="sidebar">
            {/* ICON MENU */}
            <div className="mt-12 mb-5 w-full text-center">
              <div
                className="font-bold my-4 text-[--primary-color]"
                style={{ fontFamily: "var(--heading-font)", fontSize: "var(--h2-font-size)" }}
              >
                Profile Pengguna
              </div>
            </div>
            <div
              className="flex flex-col"
              style={{ fontFamily: "var--heading-font)", fontSize: "var( --h3-font-size)" }}
            >
              <div className="mx-2 mb-60 ">
                <div className="sidebarOption">
                  <Link to={`/profiles/${user.id}`}>Profile Saya</Link>
                </div>
                <div className="sidebarOption">
                  <Link to={`/profiles/${user.id}/password`}>Ganti Kata Sandi</Link>
                </div>
                <div className="sidebarOption">
                  <Link to={`/profiles/${user.id}/recommendations`}>
                    Rekomendasi Saya
                  </Link>
                </div>
              </div>
              <div className="border-t-2 border-gray-200"></div>
              <div className="logoutBtnSection">
                <button onClick={() => dispatch(setAlert({ alert: true, alertName: 'signout' }))} className="text-red-500">
                  Keluar
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>

      {alert && alertName === 'signout' && <Alert status={alertObj.status} text={alertObj.text} button={alertObj.button}></Alert>}
    </div>
  );
}

SidebarProfile.propTypes = {
  id: PropTypes.number
}

export default SidebarProfile;