import { useNavigate } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";
import PropTypes from "prop-types";
import { useState } from "react";

function InputEmail() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    // hit api cek data ada di db
    navigate('/password/reset');
  };

  return ( 
    <div>
       <form>
        <div>
          <h1 className="heading1 black">Lupa Password?</h1>
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
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onBlur={() => !input ? setError('Email harus diisi') : setError('')}
          autoFocus
          />
          {error && <p className="paragraph-regular text-[#FE0101]">{error}</p>}

          <ButtonPrimary buttonText={"Kirim email"} onClick={submitHandler} submit={true}></ButtonPrimary>
        </div>

        <p>
          Kembali ke laman <span className="underline hover:cursor-pointer" onClick={() => navigate('/login')}>Log in</span> 
        </p>
      </form>
    </div>
  );
}

InputEmail.propTypes = {
  setNextPage: PropTypes.func
}

export default InputEmail;