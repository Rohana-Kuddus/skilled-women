import { useNavigate } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";

function InputEmail({ setNextPage }) {
  const navigate = useNavigate();

  return ( 
    <div>
       <form>
        <div className="text-center">
          <p className="heading1 black"> Lupa Password?</p>
          <p className="paragraph-regular black mb-14">
            Masukkan email yang telah kamu daftarkan untuk merubah password kamu
          </p>
        </div>

        <div className="grid place-content-center">
          <p className="green mb-2">Email: </p>
          <input 
          className="input-text mb-2"
          type="text"
          name="email"
          placeholder="Email"
          />
        </div>

        <div className="text-center">
          <ButtonPrimary buttonText={"Kirim email"} onClick={setNextPage}></ButtonPrimary>
        </div>

        <p className="text-center green mt-8">
          Kembali ke laman <span className="underline hover:cursor-pointer" onClick={()=>navigate('/login')}>Log in</span> 
        </p>
      </form>
    </div>
  );
}

export default InputEmail;