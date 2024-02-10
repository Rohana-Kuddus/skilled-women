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
      <form className="flex flex-col justify-center items-center text-center m-6">
        <div>
          <h1 className="heading1 black">Lupa Password?</h1>
          <p className="paragraph-regular black mb-12">
            Masukkan email yang telah kamu daftarkan untuk merubah password kamu
          </p>
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="Email" className="label-form text-left">
            Email
          </label>
          <input
            className="input-text mb-2 max-w-64 md:max-w-80 lg:max-w-96"
            type="text"
            name="email"
            placeholder="janedoe@email.com"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={() => !input ? setError('Email harus diisi') : setError('')}
            autoFocus
          />
          {error && <p className="paragraph-regular text-[#FE0101]">{error}</p>}
        </div>

        <ButtonPrimary buttonText={"Kirim email"} onClick={submitHandler} submit={true}></ButtonPrimary>

        <p> Kembali ke laman{" "}
          <span className="underline hover:cursor-pointer green" onClick={() => navigate("/login")}>
            Log in
          </span>
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