import ButtonPrimary from "../components/ButtonPrimary"
import { useEffect, useState } from "react"
import EyeOffLineIcon from "remixicon-react/EyeOffLineIcon"
import EyeLineIcon from "remixicon-react/EyeLineIcon"
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../redux/slices/alertSlice";
import Alert from "../components/Alert";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import Toast from "../components/Toast";
import { useLocation, useNavigate } from "react-router-dom";
import { getToast } from "../redux/slices/toastSlice";
import { resetPassword } from "../redux/slices/authSlice";
import "../styles/pages/RenewPasswordPage.css";

function RenewPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { alert, alertName } = useSelector(state => state.alert);
  const { toast, toastName } = useSelector(state => state.toast);
  const { authMessage } = useSelector(state => state.auth);
  const [input, setInput] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState({
    newPassword: '',
    confirmPassword: '',
    validatePassword: ''
  });
  const [passwordType, setPasswordType] = useState({
    newPassword: 'password',
    confirmPassword: 'password'
  });

  const alertObj = {
    status: true,
    text: 'Kata sandi Anda berhasil diubah!',
    button: {
      primary: 'Kembali ke halaman log in',
      primaryAction: () => {
        navigate('/login');
        dispatch(setAlert({ alert: false, alertName: 'password' }));
      }
    }
  };

  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
  }, []);

  useEffect(() => {
    if (authMessage == 'Reset Password Success') {
      dispatch(setAlert({ alert: true, alertName: 'password' }));
    };
  }, [authMessage]);

  // handler change visibiity
  const visibilityHandler = (e) => {
    const name = e.currentTarget.getAttribute('name');

    let value;
    switch (name) {
      case 'newPassword':
        passwordType.newPassword === 'password' ? value = 'text' : value = 'password';
        break;

      case 'confirmPassword':
        passwordType.confirmPassword === 'password' ? value = 'text' : value = 'password';
        break;

      default:
        value = 'password';
        break;
    };

    setPasswordType(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setInput(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // error handling
  const validateInput = (e) => {
    const { name, value } = e.target;

    setError(prev => {
      const stateObj = { ...prev, [name]: '' };

      switch (name) {
        case 'newPassword':
          if (!value) {
            stateObj[name] = 'Silakan isi Password.';
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj['confirmPassword'] = 'Password dan Confirm Password tidak cocok';
          } else {
            stateObj['confirmPassword'] = input.confirmPassword ? '' : error.confirmPassword;
          }
          break;

        case 'confirmPassword':
          if (!value) {
            stateObj[name] = 'Silakan isi Confirm password.';
          } else if (input.newPassword && value !== input.newPassword) {
            stateObj[name] = 'Password dan Confirm Password tidak cocok';
          }
          break;

        default:
          break;
      };

      return stateObj;
    });
  };

  // check password
  const checkCapital = /[A-Z]/.test(input.newPassword) ? 'line-through' : '';
  const checkNumber = /\d/.test(input.newPassword) ? 'line-through' : '';
  const checkCharacter = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(input.newPassword) ? 'line-through' : '';

  // submit input
  const buttonHandler = () => {
    if (checkCapital === '' || checkNumber === '' || checkCharacter === '') {
      setError(prev => ({
        ...prev,
        validatePassword: 'Password must meet the requirements.'
      }));
    } else {
      setError(prev => ({
        ...prev,
        validatePassword: ''
      }));
    };
    
    if (Object.values(error).every(v => v === '')) {
      const { email } = location.state;

      dispatch(resetPassword({ email, password: input.newPassword }));

      if (!authMessage.includes('Success')) {
        dispatch(getToast({ toast: true, toastName: 'password' }));

        setTimeout(() => {
          dispatch(getToast({ toast: false, toastName: 'password' }));
        }, 3000);
      };
    };
  };

  return (
    <div className="userPasswordForm mt-8 mx-auto">
      <div className="text-center text-balance break-words mb-">
        <h1 className="heading1 dark break-words">Perbarui Kata Sandi</h1>
        <p className="paragraph-regular break-words">Masukkan kata sandi baru kamu.</p>
      </div>

      <div className="mt-4">
        <label htmlFor="password" className="label-form">Kata sandi baru</label>
        <div className="relative flex flex-row items-center">
          <input
            className="inputPassword"
            type={passwordType.newPassword}
            name="newPassword"
            placeholder="********"
            value={input.newPassword}
            onChange={inputHandler}
            onBlur={validateInput}
            autoFocus
          ></input>
          <span name="newPassword" onClick={visibilityHandler} className="passwordIcon">
            {passwordType.newPassword === "password" ? <EyeOffLineIcon className="green hover:cursor-pointer"></EyeOffLineIcon>
              : <EyeLineIcon className="green hover:cursor-pointer"></EyeLineIcon>}
          </span>
        </div>
        {error.newPassword && <p className="paragraph-regular text-[#FE0101]">{error.newPassword}</p>}

        <label htmlFor="confirmPassword" className="label-form">Konfirmasi kata sandi</label>
        <div className="relative flex flex-row items-center">
          <input
            className="inputPassword"
            type={passwordType.confirmPassword}
            name="confirmPassword"
            placeholder="********"
            value={input.confirmPassword}
            onChange={inputHandler}
            onBlur={validateInput}
          ></input>
          <span name="confirmPassword" onClick={visibilityHandler} className="passwordIcon">
            {passwordType.confirmPassword === "password" ? <EyeOffLineIcon className="green hover:cursor-pointer"></EyeOffLineIcon>
              : <EyeLineIcon className="green hover:cursor-pointer"></EyeLineIcon>}
          </span>
        </div>
        {error.confirmPassword && <p className="paragraph-regular text-[#FE0101] break-words">{error.confirmPassword}</p>}

        <div className="my-4">
          <p className="paragraph-small dark">Kata sandi Anda harus mengandung:</p>
          <ul className="ml-4 list-disc">
            <li className={`paragraph-small dark ${checkCapital}`}>1 atau lebih huruf kapital</li>
            <li className={`paragraph-small dark ${checkNumber}`}>1 atau lebih angka</li>
            <li className={`paragraph-small dark ${checkCharacter}`}>1 atau lebih karakter khusus</li>
          </ul>
          {error.validatePassword && <p className="paragraph-regular text-[#FE0101]">{error.validatePassword}</p>}
        </div>
      </div>
      <ButtonPrimary buttonText={"Ubah kata sandi"} onClick={buttonHandler} padding="max-[380px]:px-[3.6em] max-[430px]:px-[6.8em] md:px-[10.4em]" />

      {alert && alertName === 'password' && <Alert status={alertObj.status} text={alertObj.text} button={alertObj.button}></Alert>}
      {toast && toastName === 'password' && <Toast message={authMessage}></Toast>}
    </div>
  );
}

export default RenewPasswordPage;
