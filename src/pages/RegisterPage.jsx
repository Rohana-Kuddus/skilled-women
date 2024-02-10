import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCity } from "../redux/slices/citySlice";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import ButtonPrimary from "../components/ButtonPrimary";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import EyeOffLineIcon from "remixicon-react/EyeOffLineIcon";
import EyeLineIcon from "remixicon-react/EyeLineIcon";
import { registerUser } from "../redux/slices/authSlice";
import Toast from "../components/Toast";
import { getToast } from "../redux/slices/toastSlice";
import "../styles/pages/RegisterPage.css";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { city } = useSelector((state) => state.city);
  const { toast, toastName } = useSelector((state) => state.toast);
  const { authMessage } = useSelector((state) => state.auth);
  const [validationsErrors, setValidationsErrors] = useState({});
  const [passwordType, setPasswordType] = useState("password");
  const [isOpen, setIsOpen] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [selectCity, setSelectCity] = useState("");
  const [selectGender, setSelectGender] = useState("");
  const dropdownRef = useRef();
  const searchRef = useRef();
  const [register, setRegister] = useState({
    username: "",
    email: "",
    gender: "",
    password: "",
    cityId: "",
  });

  useEffect(() => {
    dispatch(
      setFooterAnchor(
        "Icons by Icons8",
        "https://icons8.com/illustrations/illustration/638b4253fce0330001fefd18"
      )
    );
    dispatch(getCity());
  }, []);

  useEffect(() => {
    if (authMessage === "User Registration Success") {
      navigate("/login");
    }
  }, [authMessage]);

  const validateData = () => {
    const errors = {};

    if (!/^[a-zA-Z0-9]+$/.test(register.username)) {
      errors.username = "Username harus berisi huruf dan angka";
    }
    if (!/^.+@.+\..+$/.test(register.email)) {
      errors.email = "Format email tidak valid";
    }
    if (!/(?=.*\d)(?=.*[A-Z])(?=.*\W)/.test(register.password)) {
      errors.password =
        "Password min:\n 1 (angka, huruf dan karakter)";
    }
    // validasi gender
    if (!register.gender) {
      errors.gender = "Jenis Kelamin harus dipilih";
    }
    if (!register.cityId) {
      errors.city = "Kota harus dipilih";
    }

    return errors;
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    if (value !== "Pilih kota" && value !== "Pilih gender") {
      setRegister((prevData) => ({
        ...prevData,
        ...register,
        [name]: value,
      }));
    }
  };


  // dropdown
  const toggleDropdown = (dropdownName) => {
    if (isOpen === dropdownName) {
      setIsOpen('');
    } else {
      setIsOpen(dropdownName);
    };
  };

  // filter city
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

  useEffect(() => {
    if (isOpen !== "" && dropdownRef.current) {
      filterItems();
    }
  }, [isOpen]);

  // search city
  const handleSearch = (event) => {
    setSearchCity(event.target.value);
    filterItems();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validateData();
    setValidationsErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(registerUser(register));

      if (!authMessage.includes("Success")) {
        dispatch(getToast({ toast: true, toastName: "register" }));

        setTimeout(() => {
          dispatch(getToast({ toast: false, toastName: "register" }));
        }, 3000);
      }
    }
  };

  return (
    <>
      <div className="headingStart">
        <h1 className="heading1">Get Started</h1>
        <p className="paragraf-reguler">Hey, Selamat datang!</p>
        <p className="paragraf-reguler">
          Masukkan detail data sesuai form dan buat akunmu segera!
        </p>
      </div>

      <div className="register">
        {/* register image */}
        <div className="flex items-center">
          <img
            src="https://imgur.com/Ow0Trpe.png"
            className="w-40 md:w-64 lg:w-56 h-auto mb-0 md:mb-64"
            alt="register-image"
          />
        </div>
        <div className="userForm gap-0 lg:gap-8">
          <div className="w-fit">
            {/* username */}
            <div className="flex flex-col">
              <label className="label-form" htmlFor="username">
                Username
              </label>
              <input
                className="formInput pr-[7.4em] md:pr-[9em]"
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
              <label className="labelDropdown" htmlFor="gender">
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
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    <div className="innerDropdown">
                      <p className="pl-4">{selectGender || "Pilih Gender"}</p>
                      <ArrowDownSLineIcon className="arrowDropdown"></ArrowDownSLineIcon>
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
                              value: "F",
                            }
                          });
                          setSelectGender("Perempuan");
                          toggleDropdown();
                        }}
                      >
                        Perempuan
                      </a>
                      <a
                        className="options"
                        role="menuitem"
                        onClick={(e) => {
                          e.preventDefault();
                          handleInput({
                            target: {
                              name: "gender",
                              value: "M",
                            }
                          });
                          setSelectGender("Laki-Laki");
                          toggleDropdown();
                        }}
                      >
                        Laki-Laki
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
              <label className="labelDropdown" htmlFor="kota">
                Kota
              </label>
              <div className="relative inline-block">
                <div>
                  <button
                    className="formDropdown"
                    type="button"
                    name="city"
                    onClick={() => toggleDropdown("city")}
                    aria-haspopup="true"
                    aria-expanded="true"
                    required
                  >
                    <div className="innerDropdown">
                      <p className="pl-4">{selectCity || "Pilih Kota"}</p>
                      <ArrowDownSLineIcon className="arrowDropdown"></ArrowDownSLineIcon>
                    </div>
                  </button>
                </div>

                {/* city dropdown */}
                {isOpen === "city" ? (
                  <div className="dropdownOption dropdownCity" ref={dropdownRef}>
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
                          value={v.id}
                          onClick={(e) => {
                            e.preventDefault();
                            handleInput({
                              target: {
                                name: "cityId",
                                value: v.id,
                              },
                            });
                            setSelectCity(v.name);
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
                className="formInput"
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

            <div className="flex flex-col relative">
              <label className="label-form" htmlFor="password">
                Password
              </label>
              <input
                className="formInput pr-[7.4em] lg:pr-20"
                type={passwordType}
                id="password"
                name="password"
                placeholder="********"
                value={register.password}
                onChange={handleInput}
                required
              ></input>
              <span name="confirmPassword" className="absolute right-3 top-[3.2em]" onClick={() => passwordType === 'password'
                ? setPasswordType('text') : setPasswordType('password')}>
                {passwordType === "password" ? <EyeOffLineIcon className="green hover:cursor-pointer"></EyeOffLineIcon>
                  : <EyeLineIcon className="green"></EyeLineIcon>}
              </span>
              {validationsErrors.password && (
                <p className="text-[#ff0000]">{validationsErrors.password}</p>
              )}
            </div>
          </div>
          
          {/* button */}
          <div className="submitBtn mt-6">
            <p>
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
              padding="px-[2em] md:px-8 py-3"
            />
          </div>
        </div>
      </div>

      {toast && toastName === "register" && (
        <Toast message={authMessage}></Toast>
      )}
    </>
  );
}

export default RegisterPage;
