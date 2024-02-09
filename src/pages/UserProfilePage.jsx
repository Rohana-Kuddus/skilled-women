import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Edit2LineIcon from "remixicon-react/Edit2LineIcon";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import SidebarProfile from "../components/SidebarProfile";
import ButtonPrimary from "../components/ButtonPrimary";
import Alert from "../components/Alert";
import { getCity } from "../redux/slices/citySlice";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { setAlert } from "../redux/slices/alertSlice";
import "../styles/pages/UserProfilePage.css";
import "../index.css";
import { editUserProfile, getUserImage, getUserProfile } from "../redux/slices/userSlice";
import { useCookies } from "react-cookie";
import Toast from "../components/Toast";
import { getToast } from "../redux/slices/toastSlice";
import Loading from "../components/Loading";

function UserProfilePage() {
  const dispatch = useDispatch();
  const { alert, alertName } = useSelector(state => state.alert);
  const { toast, toastName } = useSelector(state => state.toast);
  const { city } = useSelector(state => state.city);
  const { user, userImage, userMessage } = useSelector(state => state.user);
  const [cookies] = useCookies();

  // dropdown
  const [isOpen, setIsOpen] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [file, setFile] = useState(null);
  const dropdownRef = useRef();
  const searchRef = useRef();

  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
    dispatch(getCity());
    dispatch(getUserProfile(cookies.token));
    dispatch(getUserImage(cookies.token));
  }, []);

  useEffect(() => {
    if (userMessage == 'Update User Profile Success') {
      dispatch(setAlert({ alert: true, alertName: 'profile' }));
    };
  }, [userMessage]);

  useEffect(() => {
    if (isOpen !== "" && dropdownRef.current) {
      filterItems();
    }
  }, [isOpen]);

  const [input, setInput] = useState({
    username: user.username,
    email: user.email,
    gender: user.gender,
    cityId: user.city,
    image: Object.keys(userImage).length !== 0 ? userImage : ''
  });
  const [error, setError] = useState({
    username: '',
    email: ''
  });

  useEffect(() => {
    const fileReader = new FileReader();
    if (typeof input.image !== 'string') {
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result) {
          setFile(result);
        };
      };
  
      fileReader.readAsDataURL(input.image);
    } else {
      setFile(null);
    };
  }, [input]);

  // change profile picture
  const fileInputRef = useRef(null);
  const triggerFileInputClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    setInput((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const alertObj = {
    status: true,
    text: "Profile berhasil disimpan!",
    button: {
      primary: 'Tutup',
      primaryAction: () => dispatch(setAlert({ alert: false, alertName: 'profile' }))
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const check = Object.keys(error).length !== 0;
    if (check) {
      const payload = {
        username: input.username,
        email: input.email,
        gender: input.gender === 'Perempuan' ? 'F' : 'M',
        cityId: input.cityId,
        image: input.image
      };

      if (typeof input.cityId !== 'number') {
        const cityInput = city.find(v => v.name === user.city).id;
        payload.cityId = cityInput;
      };

      dispatch(editUserProfile(cookies.token, payload));

      if (!userMessage.includes('Success')) {
        dispatch(getToast({ toast: true, toastName: 'profile' }));

        setTimeout(() => {
          dispatch(getToast({ toast: false, toastName: 'profile' }));
        }, 3000);
      };
    };
  };

  const errorHandler = (e) => {
    const { name, value } = e.target;

    if (!value) {
      setError(prev => ({
        ...prev,
        [name]: 'Input dilarang kosong'
      }));
    } else {
      setError(prev => ({
        ...prev,
        [name]: ''
      }));
    };
  };

  return (
    <div>
      {Object.keys(user).length === 0 ? <Loading></Loading> :
        <div className="flex flex-row" style={{ fontFamily: "var(--paragraph-font)" }}>
          <SidebarProfile></SidebarProfile>

          <div className="profileSection">
            {/* profile photo */}
            <div className="flex flex-col items-center">
              <img
                src={input.image ? file : 'https://dummyimage.com/400x400/000/fff.jpg&text=User+Profile'}
                className="rounded-full w-20 h-20 m-6"
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
            <form>
              <div className="userForm">
                <div className="w-max">
                  {/* username */}
                  <div className="flex flex-col">
                    <label className="label-form" htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={input.username}
                      onChange={inputHandler}
                      onBlur={errorHandler}
                      className="formInput"
                    />
                  </div>
                  {error.username && <p className="paragraph-regular text-[#FE0101]">{error.username}</p>}

                  {/* jenis kelamin */}
                  <div className="flex flex-col">
                    <label className="label-form" htmlFor="gender">Jenis Kelamin</label>
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
                                    value: "Perempuan",
                                  },
                                });
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
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="w-max">
                  {/* email */}
                  <div className="flex flex-col">
                    <label className="label-form" htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={input.email}
                      onChange={inputHandler}
                      onBlur={errorHandler}
                      className="formInput"
                    />
                    {error.email && <p className="paragraph-regular text-[#FE0101]">{error.email}</p>}
                  </div>

                  {/* Kota */}
                  <div className="flex flex-col">
                    <label className="label-form" htmlFor="kota">Kota</label>
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
                            <span className="ml-4">{typeof input.cityId === 'number' ? cityName : input.cityId}</span>
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
                              placeholder="Search city"
                              autoComplete="off"
                              onChange={handleSearch}
                            />
                            {city.map(v => (
                              <a href="#" role="menuitem" className="option" key={v.id} onClick={(e) => {
                                inputHandler({
                                  target: {
                                    name: "cityId",
                                    value: v.id
                                  }
                                });
                                setCityName(v.name);
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
                  <ButtonPrimary buttonText="Simpan Profile" onClick={submitHandler} submit={true} padding="px-[4.5rem] lg:px-72"></ButtonPrimary>
                </div>
              </div>
            </form>
          </div >
        </div>
      }

      {
        alert && alertName === 'profile' && <Alert status={alertObj.status} text={alertObj.text}
          button={alertObj.button}></Alert>
      }
      {toast && toastName === 'profile' && <Toast message={userMessage}></Toast>}
    </div >
  );
}

export default UserProfilePage;
