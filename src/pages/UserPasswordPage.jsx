import SidebarProfile from "../components/SidebarProfile";
import ButtonPrimary from "../components/ButtonPrimary";
import EyeLineIcon from "remixicon-react/EyeLineIcon";
import EyeOffLineIcon from "remixicon-react/EyeOffLineIcon";
import { useRef, useState } from "react";

function UserPasswordPage() {
  const passwordRef = useRef();

  // input value
  const [input, setInput] = useState({
    password: '',
    confirmPassword: ''
  });

  // error handling
  const [error, setError] = useState({
    password: '',
    confirmPassword: ''
  });

  // change password visibility
  const [passwordType, setPasswordType] = useState({
    password: 'password',
    confirmPassword: 'password'
  });
  
  // handler change visibiity
  const visibilityHandler = () => {
    event.preventDefault();
    const name = event.target.getAttribute('name');
    
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

  const onInputChange = () => {
    const { name, value } = event.target;
    
    setInput(prev => ({
      ...prev,
      [name]: value
    }));

    validateInput(event);
  };

  const validateInput = () => {
    const { name, value } = event.target;

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

  return (
    <div>
      <SidebarProfile></SidebarProfile>

      <div>
        <h1 className="heading1 green">Ganti Kata Sandi</h1>
        <p className="paragraph-regular dark">Masukkan kata sandi baru di bawah untuk mengganti kata sandi Anda.</p>
      </div>

      <div>
        <form action="" ref={passwordRef}>
          <label htmlFor="password" className="label-form">Kata Sandi Baru</label>
          <input type={passwordType.password} id="password" className="input-text" name="password" value={input.password} onChange={onInputChange} onBlur={validateInput} />
          <span className="eye-icon" onClick={visibilityHandler}>
            {passwordType.password === 'password' ? <EyeOffLineIcon className="green" name="password"></EyeOffLineIcon>
              : <EyeLineIcon className="green" name="password"></EyeLineIcon>}
          </span>
          {error.password && <p className="paragraph-regular dark">{error.password}</p>}

          <label htmlFor="confirmPassword" className="label-form">Konfirmasi Kata Sandi</label>
          <input type={passwordType.confirmPassword} id="confirmPassword" className="input-text" name="confirmPassword" value={input.confirmPassword} onChange={onInputChange} onBlur={validateInput} />
          <span className="eye-icon" onClick={visibilityHandler}>
            {passwordType.confirmPassword === 'password' ? <EyeOffLineIcon className="green" name="confirmPassword"></EyeOffLineIcon>
              : <EyeLineIcon className="green" name="confirmPassword"></EyeLineIcon>}
          </span>
          {error.confirmPassword && <p className="paragraph-regular dark">{error.confirmPassword}</p>}
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
      <ButtonPrimary></ButtonPrimary>
    </div>
  );
}

export default UserPasswordPage;