import SidebarProfile from "../components/SidebarProfile";
import ButtonPrimary from "../components/ButtonPrimary";
import EyeLineIcon from "remixicon-react/EyeLineIcon";
import EyeOffLineIcon from "remixicon-react/EyeOffLineIcon";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../redux/slices/alertSlice";
import Alert from "../components/Alert";
import { setFooterAnchor } from "../redux/slices/footerSlice";
import { editUserPassword } from "../redux/slices/userSlice";
import { useCookies } from "react-cookie";

function UserPasswordPage() {
  const dispatch = useDispatch();
  const { status, name } = useSelector(state => state.alert);
  const [cookies] = useCookies;
  const [input, setInput] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState({
    password: '',
    confirmPassword: ''
  });
  const [passwordType, setPasswordType] = useState({
    password: 'password',
    confirmPassword: 'password'
  });

  const alert = {
    status: true,
    text: 'Kata sandi Anda berhasil diubah!',
    button: {
      primary: 'Tutup',
      primaryAction: () => dispatch(setAlert({ status: false, name: 'password' }))
    }
  };

  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
  }, []);

  // handler change visibiity
  const visibilityHandler = (e) => {
    const name = e.currentTarget.getAttribute('name');

    let value;
    switch (name) {
      case 'password':
        passwordType.password === 'password' ? value = 'text' : value = 'password';
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

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setInput(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateInput = (e) => {
    const { name, value } = e.target;

    setError(prev => {
      const stateObj = { ...prev, [name]: '' };

      switch (name) {
        case 'password':
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
          } else if (input.password && value !== input.password) {
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
  const checkCapital = /[A-Z]/.test(input.password) ? 'line-through' : '';
  const checkNumber = /\d/.test(input.password) ? 'line-through' : '';
  const checkCharacter = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(input.password) ? 'line-through' : '';

  const buttonHandler = () => {
    if (error.password === '' && error.confirmPassword === '' && checkCapital !== ''
      && checkNumber !== '' && checkCharacter !== '') {
      dispatch(editUserPassword(cookies.token, { password: input.password }));
      dispatch(setAlert({ status: true, name: 'password' }));
    };
  };

  return (
    <div>
      <SidebarProfile></SidebarProfile>

      <div>
        <h1 className="heading1 green">Ganti Kata Sandi</h1>
        <p className="paragraph-regular dark">Masukkan kata sandi baru di bawah untuk mengganti kata sandi Anda.</p>
      </div>

      <div>
        <form action="">
          <label htmlFor="password" className="label-form">Kata sandi baru</label>
          <input type={passwordType.password} id="password" className="input-text" name="password" value={input.password}
            onChange={onInputChange} onBlur={validateInput} autoFocus />
          <span name="password" onClick={visibilityHandler}>
            {passwordType.password === 'password' ? <EyeOffLineIcon className="green"></EyeOffLineIcon>
              : <EyeLineIcon className="green"></EyeLineIcon>}
          </span>
          {error.password && <p className="paragraph-regular text-[#FE0101]">{error.password}</p>}

          <label htmlFor="confirmPassword" className="label-form">Konfirmasi kata sandi</label>
          <input type={passwordType.confirmPassword} id="confirmPassword" className="input-text" name="confirmPassword"
            value={input.confirmPassword} onChange={onInputChange} onBlur={validateInput} />
          <span name="confirmPassword" onClick={visibilityHandler}>
            {passwordType.confirmPassword === 'password' ? <EyeOffLineIcon className="green"></EyeOffLineIcon>
              : <EyeLineIcon className="green"></EyeLineIcon>}
          </span>
          {error.confirmPassword && <p className="paragraph-regular text-[#FE0101]">{error.confirmPassword}</p>}
        </form>

        <div>
          <p className="paragraph-small dark">Kata sandi Anda harus mengandung:</p>
          <ul className="ml-4 list-disc">
            <li className={`paragraph-small dark ${checkCapital}`}>1 atau lebih huruf kapital</li>
            <li className={`paragraph-small dark ${checkNumber}`}>1 atau lebih angka</li>
            <li className={`paragraph-small dark ${checkCharacter}`}>1 atau lebih karakter khusus</li>
          </ul>
        </div>
      </div>

      {/* panggil button primary untuk ganti password */}
      <ButtonPrimary buttonText={'Ganti kata sandi'} onClick={buttonHandler}></ButtonPrimary>

      {status && name === 'password' && <Alert status={alert.status} text={alert.text} button={alert.button}></Alert>}
    </div>
  );
}

export default UserPasswordPage;