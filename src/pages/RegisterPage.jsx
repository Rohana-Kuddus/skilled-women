import React, { useEffect, useState } from "react";
import "../index.css";
import ButtonPrimary from "../components/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { getCity } from "../redux/slices/citySlice";
import EyeOffLineIcon from "remixicon-react/EyeOffLineIcon";
import EyeLineIcon from "remixicon-react/EyeLineIcon";
import { registerUser } from "../redux/slices/authSlice";
import Toast from "../components/Toast";
import { getToast } from "../redux/slices/toastSlice";
import "../styles/components/RegisterPage.css"; 

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { city } = useSelector(state => state.city);
  const { toast, toastName } = useSelector(state => state.toast);
  const { authMessage } = useSelector(state => state.auth);
  const [validationsErrors, setValidationsErrors] = useState({});
  const [passwordType, setPasswordType] = useState('password');
  const [register, setRegister] = useState({
    username: "",
    email: "",
    gender: "",
    password: "",
    cityId: "",
  });

  useEffect(() => {
    dispatch(setFooterAnchor('Icons by Icons8', 'https://icons8.com/illustrations/illustration/638b4253fce0330001fefd18'));
    dispatch(getCity());
  }, [city]);

  useEffect(() => {
    if (authMessage === 'User Registration Success') {      
      navigate('/login');
    };
  }, [authMessage]);

  const validateData = () => {
    const errors = {};

    if (!/^[a-zA-Z0-9]+$/.test(register.username)) {
      errors.username = "Username harus hanya berisi huruf dan angka";
    };
    if (!/^.+@.+\..+$/.test(register.email)) {
      errors.email = "Format email tidak valid";
    };
    if (!/(?=.*\d)(?=.*[A-Z])(?=.*\W)/.test(register.password)) {
      errors.password =
        "Password harus mengandung minimal 1 angka, 1 huruf dan 1 karakter";
    };
    if (!register.gender) {
      errors.gender = "Jenis Kelamin harus dipilih";
    };
    if (!register.cityId) {
      errors.city = "Kota harus dipilih";
    };

    return errors;
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    if (value !== 'Pilih kota' && value !== 'Pilih gender') {
      setRegister((prevData) => ({
        ...prevData,
        ...register,
        [name]: value,
      }));
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validateData();
    setValidationsErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(registerUser(register));

      if (!authMessage.includes('Success')) {
        dispatch(getToast({ toast: true, toastName: 'register'}));

        setTimeout(() => {
          dispatch(getToast({ toast: false, toastName: 'register'}));
        }, 3000);
      };
    };
  };

  return (
    <div>
      <div className="mulai">
        <h1 className="heading1">Get Started</h1>
        <p className="paragraf-reguler">
          Hey, Selamat datang! <br /> Masukkan detail data sesuai form dan buat
          akunmu segera!
        </p>
      </div>

      <div className="justify-center">
        <div className="register">
          <div>
            <img src="https://imgur.com/Ow0Trpe.png"></img>
          </div>

          <form className="register-form">
            <div>
              <p className="label-form" htmlFor="username">
                Username
              </p>
              <input
                className="input-text"
                type="text"
                id="username"
                name="username"
                placeholder="janedoe123"
                value={register.username}
                onChange={handleInput}
                required
              />
              {validationsErrors.username && (
                <p className="text-[#ff0000]">{validationsErrors.username}</p>
              )}

              <p className="label-form " htmlFor="gender">
                Gender
              </p>
              <select
                className="input-text "
                id="gender"
                name="gender"
                value={register.gender}
                onChange={handleInput}
                required
              >
                <option defaultValue="Pilih gender">Pilih gender</option>
                <option value="F">Perempuan</option>
                <option value="M">Laki-laki</option>
              </select>
              {validationsErrors.gender && (
                <p className="text-[#ff0000]">{validationsErrors.gender}</p>
              )}

              <p className="label-form" htmlFor="city">City</p>
              <select className="input-text" id="city" type="text" name="cityId" value={register.city}
                onChange={handleInput} required>
                <option value="Pilih kota">Pilih kota</option>
                {city.map(v => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
              {validationsErrors.city && (
                <p className="text-[#ff0000]">{validationsErrors.city}</p>
              )}
            </div>

            <div>
              <p className="label-form " htmlFor="email">
                Email
              </p>
              <input
                className="input-text"
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

              <p className="label-form" htmlFor="password">
                Password
              </p>
              <input
                className="input-text"
                type={passwordType}
                id="password"
                name="password"
                placeholder="********"
                value={register.password}
                onChange={handleInput}
                required
              ></input>
              <span name="confirmPassword" onClick={() => passwordType === 'password' 
                ? setPasswordType('text') : setPasswordType('password')}>
                {passwordType === "password" ? <EyeOffLineIcon className="green hover:cursor-pointer"></EyeOffLineIcon>
                  : <EyeLineIcon className="green"></EyeLineIcon>}
              </span>
              {validationsErrors.password && (
                <p className="text-[#ff0000]">{validationsErrors.password}</p>
              )}
            </div>
          </form>
        </div>

      <div className="text-center">
        <p className="label-form ">
          Sudah punya akun?&ensp;
          <span className="underline cursor-pointer" onClick={() => navigate('/login')}>
            Log in
          </span>
        </p>

          <ButtonPrimary
            type="submit"
            buttonText="Daftar Sekarang"
            onClick={handleSubmit}
          />
        </div>
      </div>

      {toast && toastName === 'register' && <Toast message={authMessage}></Toast>}
    </div>
  );
}

export default RegisterPage;
