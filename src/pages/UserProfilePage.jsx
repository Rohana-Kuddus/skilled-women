import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../redux/slices/alertSlice";
import Edit2LineIcon from "remixicon-react/Edit2LineIcon";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import SidebarProfile from "../components/SidebarProfile";
import ButtonPrimary from "../components/ButtonPrimary";
import Alert from "../components/Alert";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import "../styles/pages/UserProfilePage.css";
import "../index.css";
import "../styles/pages/UserProfilePage.css";
import { getCity } from "../redux/slices/citySlice";

function UserProfilePage() {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.alert);
  const { city } = useSelector(state => state.city);

  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
    dispatch(getCity());
  }, [city]);

  const [input, setInput] = useState({
    username: "janedoe1",
    email: "jane@email.com",
    gender: "Perempuan",
    city: "Jakarta",
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

  // input handler
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

  // validate form
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let newErrors = {};

    if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
      newErrors.username = "Format username tidak valid (a,A,1)";
    }

    if (!/\S+@\S+\.\S+/.test(input.email)) {
      newErrors.email = "Format email tidak valid";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // alert
  const alert = {
    status: true,
    text: "Profile berhasil disimpan!",
    button: {
      primary: "Tutup",
      primaryAction: () => dispatch(setStatus(false)),
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      const validationErrors = validateForm();

      if (Object.keys(validationErrors).length === 0) {
        dispatch(setStatus(true));
      } else {
        setErrors(validationErrors);
      }
    } else {
      setErrors(newErrors);
    }
  };

  // reset footer's text + link
  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
  }, []);

  return (
    <>
      <div
        className="flex flex-row"
        style={{ fontFamily: "var(--paragraph-font)" }}
      >
        <SidebarProfile />
        <div className="profileSection">
          {/* profile photo */}
          <div className="flex flex-col items-center">
            <img
              src="https://dummyimage.com/400x400/000/fff.jpg&text=User+Profile"
              className="rounded-full w-20 m-6"
            />
            {/* edit button */}
            <div className="editBtn">
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

          {/* user information section */}
          <form onSubmit={handleSubmit}>
            <div className="userForm">
              <div className="w-max">
                {/* username */}
                <div className="flex flex-col">
                  <label className="label-form" htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={input.username}
                    onChange={inputHandler}
                    className="formInput"
                  />
                </div>
                {errors.username && (
                  <p style={{ color: "red" }}>{errors.username}</p>
                )}
                {/* jenis kelamin */}
                <div className="flex flex-col">
                  <label className="label-form" htmlFor="gender">
                    Jenis Kelamin
                  </label>
                  <div className="relative inline-block">
                    <div>
                      <button
                        type="button"
                        name="gender"
                        onClick={() => toggleDropdown("gender")}
                        className="formDropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        <div className="innerDropdown">
                          <span className="ml-4">{input.gender}</span>
                          <ArrowDownSLineIcon className="arrowDropdown" />
                        </div>
                      </button>
                    </div>
                    {isOpen === "gender" ? (
                      <div className="dropdownOption">
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <a
                            className="options"
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
                            className="options"
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
              <div className="w-max">
                {/* email */}
                <div className="flex flex-col">
                  <label className="label-form" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={inputHandler}
                    className="formInput"
                  />
                  {errors.email && (
                    <p style={{ color: "red" }}>{errors.email}</p>
                  )}
                </div>

                {/* Kota */}
                <div className="flex flex-col">
                  <label className="label-form" htmlFor="kota">
                    Kota
                  </label>
                  <div className="relative inline-block">
                    <div>
                      <button
                        type="button"
                        name="city"
                        onClick={() => toggleDropdown("city")}
                        className="formDropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                      >
                        <div className="innerDropdown">
                          <span className="ml-4">{input.city}</span>
                          <ArrowDownSLineIcon className="arrowDropdown" />
                        </div>
                      </button>
                    </div>

                    {/* city dropdown */}
                    {isOpen === "city" ? (
                      <div className="dropdownOption" ref={dropdownRef}>
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          {/* Search input */}
                          <input
                            ref={searchRef}
                            className="searchDropdown"
                            type="text"
                            placeholder="Search items"
                            autoComplete="off"
                            onChange={handleSearch}
                          />
                          {city.map(v => (
                            <a href="#" role="menuitem" className="options" key={v.id} onClick={(e) => {
                              e.preventDefault();
                              inputHandler({
                                target: {
                                  name: "city",
                                  value: v.name
                                }
                              });
                              toggleDropdown();
                            }}>{v.name}</a>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              {/* button */}
              <div className="submitBtn">
                <ButtonPrimary
                  type="submit"
                  onClick={handleSubmit}
                  buttonText="Simpan Profile"
                  padding="px-[4.5rem] lg:px-72"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      {status && (
        <Alert
          status={alert.status}
          text={alert.text}
          button={alert.button}
        ></Alert>
      )}
    </>
  );
}

export default UserProfilePage;
