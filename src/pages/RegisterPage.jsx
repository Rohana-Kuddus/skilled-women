import { useState, useEffect } from "react";
import "../index.css";
import ButtonPrimary from "../components/ButtonPrimary";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";

function RegisterPage() {
  const [open, setOpen] = useState(false);
  const Gender = ["Perempuan", "Laki-laki"];

  const [register, setRegister] = useState({
    username: "",
    email: "",
    gender: "",
    password: "",
    city: "",
  });

  const [dataCity, setDataCity] = useState([]);

  useEffect(() => {
    const apiCity = "";

    fetch(apiCity)
      .then((response) => response.json())
      .then((data) => setDataCity(data))
      .catch((error) => console.log("Kota tidak ditemukan", error));
  }, []);

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

        <div className="text-center grid grid-cols-2 gap-6">
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

            <p className="label-form ">Jenis Kelamin</p>

            <div className="relative pt-2 ">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center paragraph-regular input-text shadow-sm"
                id="gender"
                name="gender"
                value={register.gender}
                onChange={handleInput}
                required
              >
                <span className="mr-2 green">Pilih Jenis Kelamin</span>
                <ArrowDownSLineIcon className="green"></ArrowDownSLineIcon>
              </button>

              {open && (
                <div className=" bg-white p-4 w-96 shadow-lg">
                  <ul>
                    <li className="p-2 paragraph-regular green cursor-pointer rounded-md hover:bg-green-800 hover:text-white">
                      Semua
                    </li>
                    {Gender.map((gender) => (
                      <li
                        onClick={() => setOpen(false)}
                        className="p-2 paragraph-regular green cursor-pointer rounded-md hover:bg-green-800 hover:text-white"
                        key={gender}
                      >
                        {gender}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

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
              {dataCity.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
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

            {/* dropdown industri */}
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="label-form ">
          Sudah punya akun?&emsp;<span className="underline">Log in</span>
        </p>

        <ButtonPrimary buttonText="Daftar Sekarang" onClick={regist} />
      </div>
    </>
  );
}

export default RegisterPage;
