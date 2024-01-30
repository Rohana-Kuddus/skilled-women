import React, { useState, useRef, useEffect } from "react";
import Edit2LineIcon from "remixicon-react/Edit2LineIcon";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import SidebarProfile from "../components/SidebarProfile";
import ButtonPrimary from "../components/ButtonPrimary";
import "../index.css";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../redux/slices/alertSlice";

function UserProfilePage() {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.alert);

  const [input, setInput] = useState({
    // data dummy
    username: "Jane Doe",
    email: "jane@email.com",
    gender: "Perempuan",
    city: "Jakarta"
  });

  // change profile picture
  const fileInputRef = useRef(null);
  const triggerFileInputClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    setInput((prev) => ({
      ...prev,
      profilePicture: e.target.files[0],
    }));
  };

  // belum ada form validation
  const inputHandler = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // dropdown
  const [isOpen, setIsOpen] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const dropdownRef = useRef();
  const searchRef = useRef();

  const toggleDropdown = (dropdownName) => {
    setIsOpen(dropdownName);
  };

  // filter
  const filterItems = () => {
    if (isOpen !== "") {
      const items = dropdownRef.current.querySelectorAll("a");

      items.forEach((item) => {
        const text = item.textContent.toLowerCase();

        searchCity === "" ||
          text.includes(searchCity.toLowerCase()) ||
          searchCity.toLowerCase().includes(text)
          ? (item.style.display = "block")
          : (item.style.display = "none");
      });
    }
  };

  // search
  const handleSearch = (event) => {
    setSearchCity(event.target.value);
    filterItems();
  };
  useEffect(() => {
    if (isOpen !== "" && dropdownRef.current) {
      filterItems();
    }
  }, [isOpen]);

  // reset footer's text + link
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
  }, []);
  
  const alert = {
    status: true,
    text: 'Rekomendasi berhasil disimpan',
    button: {
      primary: 'Tutup',
      primaryAction: () => dispatch(setStatus(false))
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    // hit api update profile
    console.log({ message: 'success update input', data: { ...input } });

    dispatch(setStatus(true));
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <div>
          <SidebarProfile />
        </div>
        <div
          className="mr-24 mt-12"
          style={{ fontFamily: "var(--paragraph-font)" }}
        >
          <div className="flex flex-col justify-start">
            {/* profile photo */}
            <div className="main flex flex-col">
              <div className="flex flex-col items-center">
                <img
                  src="https://dummyimage.com/400x400/000/fff.jpg&text=User+Profile"
                  className="rounded-full w-20 m-6"
                />
                {/* edit button */}
                <div className="flex flex-row mb-12 gap-1 border-2 rounded-2xl px-4 align-middle justify-between">
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                  <button onClick={triggerFileInputClick}>Edit</button>
                  <Edit2LineIcon />
                </div>
              </div>
            </div>
            {/* user information section */}
            <div>
              <form className="flex flex-row">
                {/* form column 1 */}
                <div className="mr-6">
                  {/* username */}
                  <div className="flex flex-col">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={input.username}
                      onChange={inputHandler}
                      className="py-2 pl-4 pr-16 bg-gray-200 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    {/* jenis kelamin */}
                    <label htmlFor="gender">Jenis Kelamin</label>
                    <div className="relative inline-block">
                      <div>
                        <button
                          type="button"
                          name="gender"
                          onClick={() => toggleDropdown("gender")}
                          className="inline-flex justify-center w-full rounded-md py-1.5 bg-gray-200 hover:bg-gray-100"
                          aria-haspopup="true"
                          aria-expanded="true"
                        >
                          <div className="flex items-center gap-24">
                            <span className="flex-grow">{input.gender}</span>
                            <ArrowDownSLineIcon className="h-8 transition-all duration-500 group-focus:-rotate-180" />
                          </div>
                        </button>
                      </div>
                      {isOpen === "gender" ? (
                        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white">
                          <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                          >
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              role="menuitem"
                              onClick={(e) => {
                                e.preventDefault();
                                inputHandler({
                                  target: {
                                    name: "gender",
                                    value: "Laki-Laki",
                                  },
                                });
                                toggleDropdown();
                              }}
                            >
                              Laki-Laki
                            </a>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              role="menuitem"
                              onClick={(e) => {
                                e.preventDefault();
                                inputHandler({
                                  target: {
                                    name: "gender",
                                    value: "Perempuan",
                                  },
                                });
                                toggleDropdown();
                              }}
                            >
                              Perempuan
                            </a>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* form column 2 */}
                <div className="flex flex-col">
                  {/* email */}
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={inputHandler}
                    className="py-2 pl-4 pr-16 bg-gray-200 rounded-md"
                  />
                  {/* Kota */}
                  <label htmlFor="kota">Kota</label>
                  <div className="relative inline-block">
                    <div>
                      <button
                        type="button"
                        name="city"
                        onClick={() => toggleDropdown("city")}
                        className="inline-flex justify-center w-full rounded-md py-1.5 bg-gray-200 hover:bg-gray-100"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        <div className="flex items-center gap-32">
                          <span className="flex-grow">{input.city}</span>
                          <ArrowDownSLineIcon className="h-8 transition-all duration-500 group-focus:-rotate-180" />
                        </div>
                      </button>
                    </div>
                    {isOpen === "city" ? (
                      <div
                        className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white"
                        ref={dropdownRef}
                      >
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          {/* Search input */}
                          <input
                            ref={searchRef}
                            className="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
                            type="text"
                            placeholder="Search items"
                            autoComplete="off"
                            onChange={handleSearch}
                          />
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            onClick={(e) => {
                              e.preventDefault();
                              inputHandler({
                                target: {
                                  name: "city",
                                  value: "Jakarta",
                                },
                              });
                              toggleDropdown();
                            }}
                          >
                            Jakarta
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                            onClick={(e) => {
                              e.preventDefault();
                              inputHandler({
                                target: {
                                  name: "city",
                                  value: "Surabaya",
                                },
                              });
                              toggleDropdown();
                            }}
                          >
                            Surabaya
                          </a>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                {/* button */}
                <div>
                  <ButtonPrimary buttonText="Simpan Profile" onClick={submitHandler} submit={true}></ButtonPrimary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfilePage;
