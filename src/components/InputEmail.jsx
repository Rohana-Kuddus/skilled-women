// form email di forgot password

import { useNavigate } from "react-router-dom";
import propTypes from 'prop-types'

function InputEmail({ email }) {
  // const user = {
  //   "username" : "janedoe123",
  //   "email": "janedoe123@email.com",
  //   "password": "12345"
  // }
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
          placeholder={email}
          />

          {/* button primary   */}
          <button>Kirim email</button>
        </div>

        <p>
          Kembali ke laman <span className="underline" onClick={()=>navigate('/login')}>Log in</span> 
        </p>
      </form>
    </div>
  );
}

InputEmail.propTypes = {
  email: propTypes.string
}

export default InputEmail;