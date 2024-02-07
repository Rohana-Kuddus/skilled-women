import React, { useEffect, useState } from "react";
import "../index.css";
import ButtonPrimary from "../components/ButtonPrimary";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import EyeOffLineIcon from "remixicon-react/EyeOffLineIcon";
import EyeLineIcon from "remixicon-react/EyeLineIcon";
import Toast from "../components/Toast";
import { getToast } from "../redux/slices/toastSlice";
import { loginUser } from "../redux/slices/authSlice";
import { useCookies } from "react-cookie";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies] = useCookies();
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

  const checkCookies = Object.keys(cookies).length !== 0;
  if (checkCookies) {
    navigate('/');
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="heading1 dark">Log In</h1>
        <p className="dark paragraph-regular">
          Senang melihat kamu kembali! <br /> Masukkan data sesuai dengan yang
          telah kamu daftarkan.
        </p>
      </div>

      <div className="flex flex-row justify-center">
        <div>
          <img src="https://imgur.com/dEyAXJg.png" alt="login"></img>
        </div>

        <div className="">
          <div>
            <p className="label-form">Email</p>
            <input
              className="input-text"
              type="email"
              name="email"
              placeholder="janedoe@email.com"
              value={user.email}
              onChange={handleInput}
              onBlur={validateInput}
            ></input>
            {error.email && <p className="paragraph-regular text-[#FE0101]">{error.email}</p>}

            <p className="label-form">Password</p>
            <input
              className="input-text"
              type={passwordType}
              name="password"
              placeholder="********"
              value={user.password}
              onChange={handleInput}
              onBlur={validateInput}
            ></input>
            <span name="password" onClick={() => passwordType === 'password'
              ? setPasswordType('text') : setPasswordType('password')}>
              {passwordType === "password" ? <EyeOffLineIcon className="green hover:cursor-pointer"></EyeOffLineIcon>
                : <EyeLineIcon className="green hover:cursor-pointer"></EyeLineIcon>}
            </span>
            {error.password && <p className="paragraph-regular text-[#FE0101]">{error.password}</p>}
          </div>

          <div className="text-center">
            <p className="paragraph-regular green font-bold hover:cursor-pointer" onClick={() => navigate("/password/email")}>Forgot Password?</p>
            <ButtonPrimary buttonText="Log in" onClick={login} />
            <p className="paragraph-regular green font-bold">
              Belum punya akun?&ensp;
              <span className="underline cursor-pointer" onClick={() => navigate("/register")}>Daftar sekarang</span>
            </p>
          </div>
        </div>
      </div>

      {toast && toastName === 'login' && <Toast message={authMessage}></Toast>}
    </div>
  );
}

export default LoginPage;
