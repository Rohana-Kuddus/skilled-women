// form email di forgot password

import { useNavigate } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";

function InputEmail() {
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

          <ButtonPrimary text={"Kirim email"}></ButtonPrimary>
        </div>

        <p>
          Kembali ke laman <span className="underline" onClick={()=>navigate('/login')}>Log in</span> 
        </p>
      </form>
    </div>
  );
}

export default InputEmail;