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
import { getToast } from "../redux/slices/toastSlice";
import Toast from "../components/Toast";

function UserPasswordPage() {
  const dispatch = useDispatch();
  const { alert, alertName } = useSelector(state => state.alert);
  const { toast, toastName } = useSelector(state => state.toast);
  const { userMessage } = useSelector(state => state.user);
  const [cookies] = useCookies();
  const [input, setInput] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState({
    password: '',
    confirmPassword: '',
    validatePassword: ''
  });
  const [passwordType, setPasswordType] = useState({
    password: 'password',
    confirmPassword: 'password'
  });

  const alertObj = {
    status: true,
    text: 'Kata sandi Anda berhasil diubah!',
    button: {
      primary: 'Tutup',
      primaryAction: () => dispatch(setAlert({ alert: false, alertName: 'password' }))
    }
  };

  useEffect(() => {
    dispatch(setFooterAnchor("", ""));
  }, []);

  useEffect(() => {
    if (userMessage === 'Update User Password Success') {
      dispatch(setAlert({ alert: true, alertName: 'password' }));
    }
  }, [userMessage]);

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
      const stateObj = { ...prev, [name]: '', validatePassword: '' };

      switch (name) {
        case 'password':
          if (!value) {
            stateObj[name] = 'Silakan isi Password';
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj['confirmPassword'] = 'Password dan Confirm Password tidak cocok';
          } else {
            stateObj['confirmPassword'] = input.confirmPassword ? '' : error.confirmPassword;
          }
          break;

        case 'confirmPassword':
          if (!value) {
            stateObj[name] = 'Silakan isi Confirm password';
          } else if (input.password && value !== input.password) {
            stateObj[name] = 'Password dan Confirm Password tidak cocok';
          }
          break;

        default:
          break;
      };

      if (checkCapital === '' || checkNumber === '' || checkCharacter === '') {
        stateObj.validatePassword = 'Password must meet the requirements.';
      };

      return stateObj;
    });
  };

  // check password
  const checkCapital = /[A-Z]/.test(input.password) ? 'line-through' : '';
  const checkNumber = /\d/.test(input.password) ? 'line-through' : '';
  const checkCharacter = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(input.password) ? 'line-through' : '';

  const buttonHandler = () => {
    if (Object.values(error).every(v => v === '')) {
      dispatch(editUserPassword(cookies.token, { password: input.password }));

      if (!userMessage.includes('Success')) {
        dispatch(getToast({ toast: true, toastName: 'password' }));

        setTimeout(() => {
          dispatch(getToast({ toast: false, toastName: 'password' }));
        }, 3000);
      };
    };
  };

  return (
    <div className="flex flex-row">
      <SidebarProfile />
      <div className="userPasswordForm">

        <div className="text-center text-balance break-words mb-4">
          <h1 className="heading1 green break-words">Ganti Kata Sandi</h1>
          <p className="paragraph-regular dark break-words">Masukkan kata sandi baru di bawah untuk mengganti kata sandi Anda.</p>
        </div>

        <div className="passwordForm">
          <form action="">
            <label htmlFor="password" className="label-form">Kata sandi baru</label>
            <div className="relative flex flex-row items-center">
              <input type={passwordType.password} id="password" className="inputPassword" name="password" value={input.password}
                onChange={onInputChange} onBlur={validateInput} autoFocus />
              <span name="password" onClick={visibilityHandler} className="passwordIcon">
                {passwordType.password === 'password' ? <EyeOffLineIcon className="green" />
                  : <EyeLineIcon className="green" />}
              </span>
            </div>
            {error.password && <p className="paragraph-regular text-[#FE0101]">{error.password}</p>}

            <div className="mt-4">
              <label htmlFor="confirmPassword" className="label-form">Konfirmasi kata sandi</label>
              <div className="relative flex flex-row items-center">
                <input type={passwordType.confirmPassword} id="confirmPassword" className="inputPassword" name="confirmPassword"
                  value={input.confirmPassword} onChange={onInputChange} onBlur={validateInput} />
                <span name="confirmPassword" onClick={visibilityHandler} className="passwordIcon">
                  {passwordType.confirmPassword === 'password' ? <EyeOffLineIcon className="green" />
                    : <EyeLineIcon className="green" />}
                </span>
              </div>
            </div>
            {error.confirmPassword && <p className="paragraph-regular text-[#FE0101] text-balance break-words">{error.confirmPassword}</p>}
          </form>

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

        <ButtonPrimary buttonText={'Ganti kata sandi'} onClick={buttonHandler} padding="max-[380px]:px-[3.6em] max-[430px]:px-[6.8em] md:px-[11em]" />

        {alert && alertName === 'password' && <Alert status={alertObj.status} text={alertObj.text} button={alertObj.button}></Alert>}
        {toast && toastName === 'password' && <Toast message={userMessage}></Toast>}
      </div>
    </div>
  );
}

export default UserPasswordPage;