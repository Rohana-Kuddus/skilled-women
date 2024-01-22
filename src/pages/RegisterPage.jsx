import { useState  } from "react";
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

  const [register, setRegister] = useState({
    username: "",
    email: "",
    gender: "",
    password: "",
    city: "",
  });

  // ambil data kota di api, tapi belum benar kodenya

  // const [dataCity, setDataCity] = useState([]);

  // useEffect(() => {
  //   const apiCity = "";

  //   fetch(apiCity)
  //     .then((response) => response.json())
  //     .then((data) => setDataCity(data))
  //     .catch((error) => console.log("Kota tidak ditemukan", error));
  // }, []);

  // Input login form
  const handleInput = (event) => {
    setRegister({
      ...register,
      [event.target.name]: event.target.value,
    });
  };

  const regist = (event) => {
    event.preventDefault();
    console.log(register);
  };

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

        <div className="flex justify-center gap-6">
          <div>
            <p className="label-form ">Username</p>
            <input
              className="input-text"
              type="text"
              name="username"
              placeholder="janedoe123"
              value={register.username}
              onChange={handleInput}
            ></input>

            <p className="label-form ">Gender</p>
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

            <p className="label-form ">City</p>
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
              {/* {dataCity.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))} */}
            </select>
          </div>

          <div>
            <p className="label-form ">Email</p>
            <input
              className="input-text"
              type="email"
              name="email"
              placeholder="janedoe@email.com"
              value={register.email}
              onChange={handleInput}
            ></input>

            <p className="label-form">Password</p>
            <input
              className="input-text"
              type="password"
              name="password"
              placeholder="********"
              value={register.password}
              onChange={handleInput}
            ></input>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="label-form ">
          Sudah punya akun?&ensp;
          <span className="underline cursor-pointer" onClick={toLogin}>
            Log in
          </span>
        </p>

        <ButtonPrimary buttonText="Daftar Sekarang" onClick={regist} />
      </div>
    </>
  );
}

export default RegisterPage;
