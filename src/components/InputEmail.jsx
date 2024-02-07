import { useNavigate } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";
import PropTypes from "prop-types";

function InputEmail({ setNextPage }) {
  const navigate = useNavigate();

  return ( 
    <div>
       <form>
        <div>
          <p className="heading1 black"> Lupa Password?</p>
          <p className="paragraph-regular black">
            Masukkan email yang telah kamu daftarkan untuk merubah password kamu
          </p>
        </div>

        <div className="">
          <input 
          className="input-text"
          type="text"
          name="email"
          placeholder="Email"
          />

          <ButtonPrimary buttonText={"Kirim email"} onClick={setNextPage}></ButtonPrimary>
        </div>

        <p>
          Kembali ke laman <span className="underline" onClick={() => navigate('/login')}>Log in</span> 
        </p>
      </form>
    </div>
  );
}

InputEmail.propTypes = {
  setNextPage: PropTypes.func
}

export default InputEmail;