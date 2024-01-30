import React, { useEffect, useState } from "react";
import "../index.css";
import ButtonPrimary from "../components/ButtonPrimary";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";

function LoginPage() {
  
  // akan ke page register jika tulisan "daftar sekarang" di klik 
  const navigate = useNavigate();
  const toRegister = () => {
    navigate("/register");
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
     dispatch(setFooterAnchor('Icons by Icons8', 'https://icons8.com/illustrations/illustration/63bbe96d6e704382d7151e14'))
  }, []);

  return (
    <>
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
              type="text"
              name="username"
              placeholder="janedoe@email.com"
              value={user.username}
              onChange={handleInput}
            ></input>
            <br />
            <p className="label-form">Password</p>
            <input
              className="input-text"
              type="password"
              name="password"
              placeholder="********"
              value={user.password}
              onChange={handleInput}
            ></input>
            <p className="label-form text-center">Forgot Password?</p>
          </div>

          <div className="text-center">
            <ButtonPrimary buttonText="Log in" onClick={login} />
            <p className="label-form">
              Belum punya akun?&ensp;
              <span className="underline cursor-pointer" onClick={toRegister}>Daftar sekarang</span>
            </p>
          </div>
        </div>

      </div>
    </>
  );
}

export default LoginPage;
