import { useNavigate } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "../redux/slices/authSlice";
import { getToast } from "../redux/slices/toastSlice";
import Toast from "./Toast";

function InputEmail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const { authMessage } = useSelector(state => state.auth);
  const { toast, toastName } = useSelector(state => state.toast);

  useEffect(() => {
    if (authMessage === 'Check User Success') {
      navigate('/password/reset', { state: { email: input } });
    };
  }, [authMessage]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    dispatch(checkUser({ email: input })); // check user exists
    if (!authMessage.includes('Success')) {
      dispatch(getToast({ toast: true, toastName: 'user' }));

      setTimeout(() => {
        dispatch(getToast({ toast: false, toastName: 'user' }));
      }, 3000);
    };
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

      {toast && toastName === 'user' && <Toast message={authMessage}></Toast>}
    </div>
  );
}

InputEmail.propTypes = {
  setNextPage: PropTypes.func
}

export default InputEmail;