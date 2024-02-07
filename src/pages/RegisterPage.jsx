import React, { useEffect, useState } from "react";
import "../index.css";
import ButtonPrimary from "../components/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { getCity } from "../redux/slices/citySlice";
import "../styles/components/RegisterPage.css"; 

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { city } = useSelector(state => state.city);

  useEffect(() => {
    dispatch(setFooterAnchor('Icons by Icons8', 'https://icons8.com/illustrations/illustration/638b4253fce0330001fefd18'));
    dispatch(getCity());
  }, [city]);

  // input form
  const [register, setRegister] = useState({
    username: "",
    email: "",
    gender: "",
    password: "",
    city: "",
  });

  // set text and link for footer
  const dispatch = useDispatch();

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

  // jika button daftar sekarang di klik saat form kosong, maka muncul validasi untuk tiap form
  const [validationsErrors, setValidationsErrors] = useState({});

  const validateData = () => {
    const errors = {};

    // validasi username hanya huruf dan angka
    if (!/^[a-zA-Z0-9]+$/.test(register.username)) {
      errors.username = "Username harus hanya berisi huruf dan angka";
    }

    // validasi email dengan format @
    if (!/^.+@.+\..+$/.test(register.email)) {
      errors.email = "Format email tidak valid";
    }

    // validasi password, minimal 1 angka, 1 huruf dan 1 karakter
    if (!/(?=.*\d)(?=,*[a-zA-Z])(?=.*\W)/.test(register.password)) {
      errors.password =
        "Password harus mengandung minimal 1 angka, 1 huruf\n dan 1 karakter";
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(register);

    const errors = validateData();

    if (Object.keys(errors).length === 0) {
      console.log("Register", register);
    } else {
      setValidationsErrors(errors);
    }
  };

  return (
    <>
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
                <option className="hover:bg-green-800" value="perempuan">
                  Perempuan
                </option>
                <option value="laki-laki">Laki-laki</option>
              </select>
              {validationsErrors.gender && (
                <p className="text-[#ff0000]">{validationsErrors.gender}</p>
              )}

              <p className="label-form " htmlFor="city">City</p>
              <select className="input-text" id="city" type="text" name="city" value={register.city} 
                onChange={handleInput} required>
                <option value="" disabled>Pilih Kota</option>
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
    </>
  );
}

export default RegisterPage;
