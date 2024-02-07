import React, { useEffect, useState } from "react";
import "../index.css";
import ButtonPrimary from "../components/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import "../styles/components/LoginPage.css";

function LoginPage() {
  // akan ke page register jika tulisan "daftar sekarang" di klik
  const navigate = useNavigate();
  const toRegister = () => {
    navigate("/register");
  };

  const toForgotPassword = () => {
    navigate("/password/email");
  };

  // input form
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleInput = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const login = (event) => {
    event.preventDefault();
    console.log(user);
  };

  // set text and link for footer
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setFooterAnchor(
        "Icons by Icons8",
        "https://icons8.com/illustrations/illustration/63bbe96d6e704382d7151e14"
      )
    );
  }, []);

  return (
    <>
      <div className="login">
        <h1 className="login-h1">Log In</h1>
        <p className="login-p">
          Senang melihat kamu kembali! <br /> Masukkan data sesuai dengan yang
          telah kamu daftarkan.
        </p>
      </div>

      <div className="login-konten">
        <div>
          <img src="https://imgur.com/Z8jSaVB.png" alt="login"></img>
        </div>

        <div className="login-form">
          <div className="mb-4">
            <label className="label">Email</label>
            <input
              className="input-text"
              type="text"
              name="username"
              placeholder="janedoe@email.com"
              value={user.username}
              onChange={handleInput}
            ></input>
          </div>

          <div className="mb-4">
            <label className="label">Password</label>
            <input
              className="input-text"
              type="password"
              name="password"
              placeholder="********"
              value={user.password}
              onChange={handleInput}
            ></input>

            <p className="forgot-password" onClick={toForgotPassword}>Forgot Password?</p>
          </div>

          <div className="button-div">
            <ButtonPrimary buttonText="Log in" onClick={login} />
            <p className="button-p">
              Belum punya akun?&ensp;
              <span className="button-span" onClick={toRegister}>
                Daftar sekarang
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
