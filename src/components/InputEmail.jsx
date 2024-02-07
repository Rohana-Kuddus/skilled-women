import { useNavigate } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";

function InputEmail({ setNextPage }) {
  const navigate = useNavigate();

  return (
    <>
      <form className="flex flex-col justify-center items-center text-center gap-12 m-6 md:my-20">
        <div>
          <p className="heading1 black"> Lupa Password?</p>
          <p className="paragraph-regular black">
            Masukkan email yang telah kamu daftarkan untuk merubah password kamu
          </p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="Email" className="label-form text-left">
            Email
          </label>
          <input className="input-text mb-2 max-w-64 md:max-w-80 lg:max-w-96" type="text" name="email" placeholder="Janedoe@email.com"
          />
          <ButtonPrimary buttonText={"Kirim Email"} onClick={setNextPage}
          ></ButtonPrimary>
        </div>
        <p> Kembali ke laman{" "}
          <span className="underline" onClick={() => navigate("/login")}>
            Log in
          </span>
        </p>
      </form>
    </>
  );
}

export default InputEmail;