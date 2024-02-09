import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../components/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import EyeOffLineIcon from "remixicon-react/EyeOffLineIcon";
import EyeLineIcon from "remixicon-react/EyeLineIcon";
import Toast from "../components/Toast";
import { getToast } from "../redux/slices/toastSlice";
import { loginUser } from "../redux/slices/authSlice";
import "../styles/pages/LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast, toastName } = useSelector(state => state.toast);
  const { authMessage } = useSelector(state => state.auth);
  const [passwordType, setPasswordType] = useState('password');
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    dispatch(setFooterAnchor('Icons by Icons8', 'https://icons8.com/illustrations/illustration/63bbe96d6e704382d7151e14'));
  }, []);

  useEffect(() => {
    if (authMessage === 'Login Success') {
      navigate('/');
    };
  }, [authMessage]);

  const handleInput = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const validateInput = (e) => {
    const { name, value } = e.target;

    setError(prev => {
      const stateObj = { ...prev, [name]: '' };

      switch (name) {
        case 'email':
          if (!value) {
            stateObj[name] = 'Email tidak boleh kosong.';
          };
          break;

        case 'password':
          if (!value) {
            stateObj[name] = 'Password tidak boleh kosong.';
          };
          break;

        default:
          break;
      };

      return stateObj;
    });
  };

  const login = (event) => {
    event.preventDefault();
    if (!error.email && !error.password) {
      dispatch(loginUser(user));

      if (!authMessage.includes('Success')) {
        dispatch(getToast({ toast: true, toastName: 'login' }));

        setTimeout(() => {
          dispatch(getToast({ toast: false, toastName: 'login' }));
        }, 3000);
      };
    };
  };

  return (
    <>
      <div className="headingStart">
        <h1 className="heading1">Log In</h1>
        <p className="paragraph-reguler">Senang melihat kamu kembali!</p>
        <p className="paragraf-reguler">
          Masukkan sesuai dengan data yang telah kamu daftarkan.
        </p>
      </div>

      <div className="login">
        {/* login image */}
        <div className="mb-0 md:mb-20">
          <img
            src="https://imgur.com/Z8jSaVB.png"
            className="w-72 md:w-80 h-auto"
            alt="login-image"
          />
        </div>

        <div className="loginContent">
          <div className="w-fit">
            {/* email */}
            <div className="flex flex-col">
              <label className="label-form">Email</label>
              <input
                className="formInput pr-24 lg:pr-40"
                type="email"
                name="email"
                placeholder="janedoe@email.com"
                value={user.email}
                onChange={handleInput}
                onBlur={validateInput}
              ></input>
            </div>
            {error.email && <p className="paragraph-regular text-[#FE0101]">{error.email}</p>}

             {/* password */}
            <div className="flex flex-col relative">
              <label className="label-form">Password</label>
              <input
                className="formInput pr-24 lg:pr-40"
                type={passwordType}
                name="password"
                placeholder="********"
                value={user.password}
                onChange={handleInput}
                onBlur={validateInput}
              ></input>
              <span name="password" className="absolute right-3 top-[3.2em]" onClick={() => passwordType === 'password'
                ? setPasswordType('text') : setPasswordType('password')}>
                {passwordType === "password" ? <EyeOffLineIcon className="green hover:cursor-pointer"></EyeOffLineIcon>
                  : <EyeLineIcon className="green hover:cursor-pointer"></EyeLineIcon>}
              </span>
            </div>
            {error.password && <p className="paragraph-regular text-[#FE0101]">{error.password}</p>}
            <p className="forgot-password hover:cursor-pointer" onClick={() => navigate("/password/email")}>Forgot Password?</p>
          </div>

          <div className="submitBtn mt-12">
            <ButtonPrimary buttonText="Log in" onClick={login} padding="px-[2em] py-3"/>
            <p className="mt-4">
              Belum punya akun?&ensp;
              <span className="underline decoration-solid" onClick={() => navigate("/register")}>Daftar sekarang</span>
            </p>
          </div>
        </div>
      </div>

      {toast && toastName === 'login' && <Toast message={authMessage}></Toast>}
    </>
  );
}

export default LoginPage;
