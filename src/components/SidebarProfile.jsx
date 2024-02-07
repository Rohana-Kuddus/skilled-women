import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../redux/slices/alertSlice"
import MenuLineIcon from "remixicon-react/MenuLineIcon";
import Alert from "./Alert";
import "../styles/components/SidebarProfile.css";
import "../index.css";
import { logoutUser } from "../redux/slices/authSlice";

function SidebarProfile({ id }) {
  const [isOpen, setOpen] = useState(window.innerWidth >= 768);
  const dispatch = useDispatch();
  const { alert, alertName } = useSelector(state => state.alert);

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
      },
      secondary: 'Batal',
      secondaryAction: () => dispatch(setAlert({ alert: false, alertName: 'signout' }))
    }
  };

  return (
    <div>
      <div className="flex flex-row">
        <button
          onBlur={handleBlur}
          onClick={handleToggle}
          className="inline-flex p-4 rounded md:hidden side-toggle"
        >
          <MenuLineIcon color="#4F6C6A" />
        </button>
        {isOpen && (
          <aside
            className="w-80 h-full border-r-2 border-b-2 aside"
            style={{ backgroundColor: "var( --white-color)" }}
          >
            {/* ICON MENU */}
            <div className="mt-12 mb-5 w-full text-center">
              <div
                className="font-bold my-4"
                style={{
                  fontFamily: "var(--heading-font)",
                  fontSize: "var(--h2-font-size)",
                  color: "var( --primary-color)",
                }}
              >
                Profile Pengguna
              </div>
            </div>
            <div
              className="flex flex-col"
              style={{
                fontFamily: "var(--heading-font)",
                fontSize: "var( --h3-font-size)",
              }}
            >
              <div className="mx-2 mb-60 ">
                <div className="my-1 p-1 w-full text-center hover:bg-gray-200 active:bg-gray-200 rounded-md">
                  <Link to={`/profiles/${id}`}>Profile Saya</Link>
                </div>
                <div className="my-1 p-1 w-full text-center hover:bg-gray-200 active:bg-gray-200 rounded-md">
                  <Link to={`/profiles/${id}/password`}>Ganti Kata Sandi</Link>
                </div>
                <div className="my-1 p-1 w-full text-center hover:bg-gray-200 active:bg-gray-200 rounded-md">
                  <Link to={`/profiles/${id}/recommendations`}>
                    Rekomendasi Saya
                  </Link>
                </div>
              </div>
              <div className="border-t-2 border-gray-200"></div>
              <div className="my-5 mx-2 p-1 text-center hover:bg-red-200 active:bg-red-200 rounded-md">
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

export default SidebarProfile;