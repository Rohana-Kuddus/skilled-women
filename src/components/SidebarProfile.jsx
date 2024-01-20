import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

function SidebarProfile({ id, action }) {
  return (
    <>
      <div className="flex min-h-screen flex-row bg-gray-100">
        <aside
          className="sidebar w-80 md:shadow-md border-r-2"
          style={{ backgroundColor: "var( --white-color)" }}
        >
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
                {/* <Link to={`/profiles/${id}`}>Profile Saya</Link> */}
              </div>
              <div className="my-1 p-1 w-full text-center hover:bg-gray-200 active:bg-gray-200 rounded-md">
                {/* <Link to={`/profiles/${id}/password`}>
                  Ganti Kata Sandi
                </Link> */}
              </div>
              <div className="my-1 p-1 w-full text-center hover:bg-gray-200 active:bg-gray-200 rounded-md">
                {/* <Link to={`/profiles/${id}/recommendation`}>
                  Rekomendasi Saya
                </Link> */}
              </div>
            </div>
            <div className="border-t-2 border-gray-200"></div>
            <div className="mt-4 mx-2 text-center hover:bg-red-200 active:bg-red-200 rounded-md">
              <button onClick={action} className="text-red-500">
                Keluar
              </button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default SidebarProfile;