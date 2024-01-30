import ButtonPrimary from "../components/ButtonPrimary"
import { useEffect, useState } from "react"
import EyeOffLineIcon from "remixicon-react/EyeOffLineIcon"
import EyeLineIcon from "remixicon-react/EyeLineIcon"
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../redux/slices/alertSlice";
import Alert from "../components/Alert";
import { setFooterAnchor } from "../redux/slices/footerSlice";

function RenewPasswordPage() {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.alert);

  const alert = {
    status: true,
    text: 'Kata sandi Anda berhasil diubah!',
    button: {
      primary: 'Kembali ke halaman log in',
      primaryAction: () => dispatch(setStatus(false))
    }
  };

  const [input, setInput] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [error, setError] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordType, setPasswordType] = useState({
    newPassword: 'password',
    confirmPassword: 'password'
  });

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
            stateObj[name] = 'Please enter Password.';
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj['confirmPassword'] = 'Password and Confirm Password does not match.';
          } else {
            stateObj['confirmPassword'] = input.confirmPassword ? '' : error.confirmPassword;
          }
          break;

        case 'confirmPassword':
          if (!value) {
            stateObj[name] = 'Please enter Confirm Password.';
          } else if (input.newPassword && value !== input.newPassword) {
            stateObj[name] = 'Password and Confirm Password does not match.';
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
    if (error.newPassword === '' && error.confirmPassword === '' && checkCapital !== '' && checkNumber !== '' && checkCharacter !== '') {
      // akan buat function hit api ubah password
      dispatch(setStatus(true));
    };
  };

  // reset footer's text + link
  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
  }, []);

  return (
    <div>
      <div className="text-center">
        <h1 className="heading1 dark">Perbarui Kata Sandi</h1>
        <p className="paragraph-regular">Masukkan kata sandi baru kamu.</p>
      </div>

      <div>
        <div>
          <label className="label-form">Kata sandi baru</label>
          <input
            className="input-text"
            type={passwordType.newPassword}
            name="newPassword"
            placeholder="********"
            value={input.newPassword}
            onChange={inputHandler}
            onBlur={validateInput}
            autoFocus
          ></input>
          <span name="newPassword" onClick={visibilityHandler}>
            {passwordType.newPassword === "password" ? <EyeOffLineIcon className="green"></EyeOffLineIcon>
              : <EyeLineIcon className="green"></EyeLineIcon>}
          </span>
        </div>
        {error.newPassword && <p className="paragraph-regular text-[#FE0101]">{error.newPassword}</p>}

        <div>
          <label className="label-form">Konfirmasi kata sandi</label>
          <input
            className="input-text"
            type={passwordType.confirmPassword}
            name="confirmPassword"
            placeholder="********"
            value={input.confirmPassword}
            onChange={inputHandler}
            onBlur={validateInput}
          ></input>
          <span name="confirmPassword" onClick={visibilityHandler}>
            {passwordType.confirmPassword === "password" ? <EyeOffLineIcon className="green"></EyeOffLineIcon>
              : <EyeLineIcon className="green"></EyeLineIcon>}
          </span>
        </div>
        {error.confirmPassword && <p className="paragraph-regular text-[#FE0101]">{error.confirmPassword}</p>}

        <div>
          <p className="paragraph-small dark">Kata sandi Anda harus mengandung:</p>
          <ul className="ml-4 list-disc">
            <li className={`paragraph-small dark ${checkCapital}`}>1 atau lebih huruf kapital</li>
            <li className={`paragraph-small dark ${checkNumber}`}>1 atau lebih angka</li>
            <li className={`paragraph-small dark ${checkCharacter}`}>1 atau lebih karakter khusus</li>
          </ul>
        </div>

        <ButtonPrimary buttonText={"Ubah kata sandi"} onClick={buttonHandler}></ButtonPrimary>
      </div>

        {status && <Alert status={alert.status} text={alert.text} button={alert.button}></Alert>}
    </div>
  );
}

export default RenewPasswordPage;
