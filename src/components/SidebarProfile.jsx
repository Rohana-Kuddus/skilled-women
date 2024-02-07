import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../redux/slices/alertSlice"
import MenuLineIcon from "remixicon-react/MenuLineIcon";
import Alert from "./Alert";
import "../styles/components/SidebarProfile.css";
import "../index.css";

function SidebarProfile({ id }) {
  const [isOpen, setOpen] = useState(window.innerWidth >= 768);

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

    // alert
    // saat user click tombol yang ada komponen alert seharusnya yang ketrigger sesuai tombol yang di klik 
    const dispatch = useDispatch();
    const { status } = useSelector(state => state.alert);
  
    const alert = {
      status: false,
      text: 'Apakah Anda yakin ingin keluar?',
      button: {
        primary: 'Keluar',
          primaryAction: () => dispatch(setStatus(false)),
        secondary: 'Batal',
          secondaryAction: () => dispatch(setStatus(false))
      },
    };

  // ketika user klik tombol keluar, tampilan navbar seharusnya tidak langsung berubah, tunggu komponen alert
    const handleLogout = () => {
      dispatch(setStatus(true));
   };

  return (
    <>
        <button onBlur={handleBlur} onClick={handleToggle} className="burgerBtn">
          <MenuLineIcon color="#4F6C6A" />
        </button>
        {isOpen && (
          <aside className="sidebar">
            {/* ICON MENU */}
            <div className="mt-12 mb-5 w-full text-center">
              <div 
              className="font-bold my-4 text-[--primary-color]" 
              style={{ fontFamily: "var(--heading-font)", fontSize: "var(--h2-font-size)"}}
              >
                Profile Pengguna
              </div>
            </div>
            <div
              className="flex flex-col"
              style={{ fontFamily: "var--heading-font)",fontSize: "var( --h3-font-size)"}}
              >
              <div className="mx-2 mb-60 ">
                <div className="sidebarOption">
                  <Link to={`/profiles/${id}`}>Profile Saya</Link>
                </div>
                <div className="sidebarOption">
                  <Link to={`/profiles/${id}/password`}>Ganti Kata Sandi</Link>
                </div>
                <div className="sidebarOption">
                  <Link to={`/profiles/${id}/recommendation`}>
                    Rekomendasi Saya
                  </Link>
                </div>
              </div>
              <div className="border-t-2 border-gray-200"></div>
              <div className="logoutBtnSection">
                <button onClick={handleLogout} className="text-red-500">
                  Keluar
                </button>
              </div>
            </div>
          </aside>
        )}
      {status && <Alert status={alert.status} text={alert.text} button={alert.button}></Alert>}
    </>
  );
}

export default SidebarProfile;