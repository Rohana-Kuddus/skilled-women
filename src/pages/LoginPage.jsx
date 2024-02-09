import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../components/ButtonPrimary";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import "../styles/pages/LoginPage.css";
import "../index.css";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // navigate to register and forgot password page
  const toRegister = () => {
    navigate("/register");
  };
  const toForgotPassword = () => {
    navigate("/password/email");
  };

  // input form
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleInput = (event) => {
    const { name, value } = event.target;
    setLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handle submit login
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateData();

    if (Object.keys(errors).length === 0) {
      console.log("Login", login);
    } else {
      setValidationsErrors(errors);
    }
  };

  const [validationsErrors, setValidationsErrors] = useState({});
  const validateData = () => {
    const errors = {};
    // validasi email dengan format @
    if (!/^\S+@\S+\.\S+$/.test(login.email)) {
      errors.email = "Email salah atau belum terdaftar";
    }
    // validasi password, minimal 1 angka, 1 huruf dan 1 karakter
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(
        login.password
      )
    ) {
      errors.password = "Password salah atau belum terdaftar";
    }

    return errors;
  };

  // set text and link for footer
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
            className="w-72 lg:w-96 h-auto"
            alt="login-image"
          />
        </div>
        <div className="loginContent">
        <form onClick={handleSubmit}>
          
            <div className="w-fit">
              {/* email */}
              <div className="flex flex-col">
                <label className="label-form" htmlFor="email">
                  Email
                </label>
                <input
                  className="formInput pr-24 lg:pr-40"
                  type="text"
                  name="email"
                  placeholder="janedoe@email.com"
                  value={login.email}
                  onChange={handleInput}
                ></input>
              </div>
              {validationsErrors.email && (
                <p className="text-[#ff0000]">{validationsErrors.email}</p>
              )}

              {/* password */}
              <div className="flex flex-col">
                <label className="label-form">Password</label>
                <input
                  className="formInput pr-24 lg:pr-40"
                  type="password"
                  name="password"
                  placeholder="********"
                  value={login.password}
                  onChange={handleInput}
                ></input>
              </div>
              {validationsErrors.password && (
                <p className="text-[#ff0000]">{validationsErrors.password}</p>
              )}
              <p className="mt-4" onClick={toForgotPassword}>
                Forgot Password?
              </p>
            </div>

          {/* button and shortcut */}
          <div className="submitBtn mt-12">
            <ButtonPrimary
              type="submit"
              buttonText="Log in"
              onClick={handleSubmit}
              padding="px-[2em] md:px-8 py-3"
            />
            <p className="mt-4">
              Belum punya akun?&ensp;
              <span className="underline decoration-solid" onClick={toRegister}>
                Daftar sekarang
              </span>
            </p>
          </div>
        </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
