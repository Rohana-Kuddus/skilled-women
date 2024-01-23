import { useState } from "react";
// import { useEffect } from "react";
import "../index.css";
import ButtonPrimary from "../components/ButtonPrimary";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  // Pindah ke page login ketika "login" di klik
  const navigate = useNavigate();
  const toLogin = () => {
    navigate("/login");
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
    if (!/^.+@.+\..+$/.test(register.email)) {
      errors.email = "Format email tidak valid";
    }

    // validasi password, minimal 1 angka, 1 huruf dan 1 karakter
    if (!/(?=.*\d)(?=,*[a-zA-Z])(?=.*\W)/.test(register.password)) {
      errors.password =
        "Password harus mengandung minaml 1 angka, 1 huruf dan 1 karakter";
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

   // ambil data kota di api, tapi belum benar kodenya

  // const [dataCity, setDataCity] = useState([]);

  // useEffect(() => {
  //   const apiCity = "";

  //   fetch(apiCity)
  //     .then((response) => response.json())
  //     .then((data) => setDataCity(data))
  //     .catch((error) => console.log("Kota tidak ditemukan", error));
  // }, []);

  return (
    <>
      <div className="text-center">
        <h1 className="heading1">Get Started</h1>
        <p className="paragraf-reguler">
          Hey, Selamat datang! <br /> Masukkan detail data sesuai form dan buat
          akunmu segera!
        </p>
      </div>

      <div className="flex flex-row justify-center gap-24">
        <div>
          <img src="https://imgur.com/dEyAXJg.png"></img>
        </div>

        <form >
          <div className="flex justify-center gap-6">
            <div>
              <p className="label-form" htmlFor="username">Username</p>
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
                <p style={{ color: "red" }}>{validationsErrors.username}</p>
              )}

              <p className="label-form " htmlFor="gender">Gender</p>
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
                <p style={{ color: "red" }}>{validationsErrors.gender}</p>
              )}

              <p className="label-form " htmlFor="city">City</p>
              <select
                className="input-text"
                id="city"
                type="text"
                name="city"
                value={register.city}
                onChange={handleInput}
                required
              >
                <option value="" disabled>
                  Pilih Kota
                </option>

                {/* Ambil data dari API */}

                {/* {dataCity.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))} */}
              </select>
              {validationsErrors.city && (
                <p style={{ color: "red" }}>{validationsErrors.city}</p>
              )}
            </div>

            <div>
              <p className="label-form " htmlFor="email">Email</p>
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
                <p style={{ color: "red" }}>{validationsErrors.email}</p>
              )}

              <p className="label-form" htmlFor="password">Password</p>
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
                <p style={{ color: "red" }}>{validationsErrors.password}</p>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="text-center">
        <p className="label-form ">
          Sudah punya akun?&ensp;
          <span className="underline cursor-pointer" onClick={toLogin}>
            Log in
          </span>
        </p>

        <ButtonPrimary type="submit" buttonText="Daftar Sekarang" onClick={handleSubmit} />
      </div>
    </>
  );
}

export default RegisterPage;
