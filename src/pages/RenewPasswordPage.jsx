import ButtonPrimary from "../components/ButtonPrimary";
import { useState } from "react";

function RenewPasswordPage() {
  const [reset, setReset] = useState({
    newpassword: "",
    confirm: "",
  });

  const handleInput = (event) => {
    setReset({
      ...reset,
      [event.target.name]: event.target.value,
    });
  };

  const renewpassword = (event) => {
    event.preventDefault();
    console.log(reset);
  };

  return (
    <>
      <div className="text-center">
        <h1 className="heading1 dark">Renew Your Password</h1>
        <p className="paragraph-regular">Masukkan password baru kamu</p>
      </div>

      <div className="text-center">
        <div>
          <p className="label-form ">New Password</p>
          <input
            className="input-text"
            type="password"
            name="newpassword"
            placeholder="********"
            value={reset.newpassword}
            onChange={handleInput}
          ></input>
        </div>

        <div>
          <p className="label-form">Confirm New Password</p>
          <input
            className="input-text"
            type="password"
            name="confirm"
            placeholder="********"
            value={reset.confirm}
            onChange={handleInput}
          ></input>
        </div>
        <br />

        {/* Buttonnya belum bisa munculin alert berhasil */}
        {/* Passwordnya belum hilang ketika button di klik */}
        <ButtonPrimary buttonText="Ubah Password" onClick={renewpassword} />

      </div>
    </>
  );
}

export default RenewPasswordPage;
