import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCity } from "../redux/slices/citySlice";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import ButtonPrimary from "../components/ButtonPrimary";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import "../styles/pages/RegisterPage.css";
import "../index.css";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { city } = useSelector((state) => state.city);

  useEffect(() => {
    dispatch(
      setFooterAnchor(
        "Icons by Icons8",
        "https://icons8.com/illustrations/illustration/638b4253fce0330001fefd18"
      )
    );
    dispatch(getCity());
  }, [city]);

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
        const currentSearchCity = searchCity.toLowerCase();

        item.style.display = text.includes(currentSearchCity)
          ? "block"
          : "none";
      });
    }
  };

  // input form
  const [register, setRegister] = useState({
    username: "",
    email: "",
    gender: "",
    password: "",
    city: "",
  });

  // jika button daftar sekarang di klik saat form kosong, maka muncul validasi untuk tiap form
  const [validationsErrors, setValidationsErrors] = useState({});

  const validateData = () => {
    const errors = {};

    // validasi username hanya huruf dan angka
    if (!/^[a-zA-Z0-9]+$/.test(register.username)) {
      errors.username = "Username harus hanya berisi huruf dan angka";
    }

    // validasi email dengan format @
    if (!/^\S+@\S+\.\S+$/.test(register.email)) {
      errors.email = "Format email tidak valid";
    }

    // validasi password, minimal 1 angka, 1 huruf dan 1 karakter
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(
        register.password
      )
    ) {
      errors.password =
        "Password harus memiliki minimal 1 angka,\n 1 huruf dan 1 karakter";
    }

    // validasi gender
    if (!register.gender) {
      errors.gender = "Jenis Kelamin harus dipilih";
    }

    // validasi kota
    if (!register.city) {
      errors.city = "Kota harus dipilih";
    }

    return errors;
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setRegister((prevData) => ({
      ...prevData,
      ...register,
      [name]: value,
    }));
  };

  // search
  const handleSearch = (event) => {
    setSearchCity(event.target.value);
    filterItems();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validateData();

    if (Object.keys(errors).length === 0) {
      console.log("Register", register);
    } else {
      setValidationsErrors(errors);
    }
  };

  // set text and link for footer
  useEffect(() => {
    dispatch(
      setFooterAnchor(
        "Icons by Icons8",
        "https://icons8.com/illustrations/illustration/638b4253fce0330001fefd18"
      )
    );
    return () => {
      dispatch(setFooterAnchor("", ""));
    };
  }, []);

  return (
    <>
      <div className="headingStart">
        <h1 className="heading1">Get Started</h1>
        <p className="paragraf-reguler">Hey, Selamat datang!</p>
        <p className="paragraf-reguler">Masukkan detail data sesuai form dan buat akunmu segera!</p>
      </div>

      <div className="register">
        {/* register image */}
        <div className="">
          <img
            src="https://imgur.com/Ow0Trpe.png"
            className="w-40 md:w-52 h-auto" alt="register-image"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="userForm gap-0 lg:gap-4">
            <div className="w-fit">
              {/* username */}
              <div className="flex flex-col">
                <label className="label-form" htmlFor="username">
                  Username
                </label>
                <input
                  className="formInput pr-16"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="janedoe123"
                  value={register.username}
                  onChange={handleInput}
                  required
                />
              </div>
              {validationsErrors.username && (
                <p className="text-[#ff0000]">{validationsErrors.username}</p>
              )}
              {/* jenis kelamin */}
              <div className="flex flex-col">
                <label className="label-form" htmlFor="gender">
                  Jenis Kelamin
                </label>
                <div className="relative inline-block">
                  <div>
                    <button
                      className="formDropdown"
                      type="button"
                      id="gender"
                      name="gender"
                      onClick={() => toggleDropdown("gender")}
                      value={register.gender}
                      onChange={handleInput}
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      <div className="innerDropdown">
                        <span className="ml-4">{register.gender || "Jenis Kelamin"}</span>
                        <ArrowDownSLineIcon className="arrowDropdown" />
                      </div>
                    </button>
                  </div>
                  {isOpen === "gender" ? (
                    <div className="dropdownOption z-10">
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
                            handleInput({
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
                            handleInput({
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
                {validationsErrors.gender && (
                  <p className="text-[#ff0000]">{validationsErrors.gender}</p>
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
                      className="formDropdown"
                      type="button"
                      name="city"
                      value={register.city}
                      onClick={() => toggleDropdown("city")}
                      aria-haspopup="true"
                      aria-expanded="true"
                      required
                    >
                      <div className="innerDropdown">
                        <span className="ml-4">{register.city || "Pilih Kota"}</span>
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
                          className="searchDropdown"
                          ref={searchRef}
                          type="text"
                          placeholder="Search City"
                          onChange={handleSearch}
                          autoComplete="off"
                          required
                        />
                        {city.map((v) => (
                          <a
                            role="menuitem"
                            className="options hover:bg-[--primary-color] hover:text-[--secondary-color]"
                            key={v.id}
                            onClick={(e) => {
                              e.preventDefault();
                              handleInput({
                                target: {
                                  name: "city",
                                  value: v.name,
                                },
                              });
                              toggleDropdown();
                            }}
                          >
                            {v.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {validationsErrors.city && (
                    <p className="text-[#ff0000]">{validationsErrors.city}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="w-fit">
              {/* email */}
              <div className="flex flex-col">
                <label className="label-form" htmlFor="email">
                  Email
                </label>
                <input
                  className="formInput pr-16"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="janedoe@email.com"
                  value={register.email}
                  onChange={handleInput}
                  required
                ></input>
                {validationsErrors.email && (
                  <p className="text-[#ff0000]">{validationsErrors.email}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="label-form" htmlFor="password">
                  Password
                </label>
                <input
                  className="formInput pr-16"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="********"
                  value={register.password}
                  onChange={handleInput}
                  required
                ></input>
                {validationsErrors.password && (
                  <p className="text-[#ff0000]">{validationsErrors.password}</p>
                )}
              </div>
            </div>
            {/* button */}
            <div className="submitBtn mt-12">
              <p className="label-form ">
                Sudah punya akun?&ensp;
                <span
                  className="underline cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </span>
              </p>
              <ButtonPrimary
                type="submit"
                onClick={handleSubmit}
                buttonText="Daftar Sekarang"
                padding="px-[4.7em] md:px-8 py-3"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;
