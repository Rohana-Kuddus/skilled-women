// konfirmasi email terkirim
import { useNavigate } from 'react-router-dom'

function Confirmation() {
  const navigate = useNavigate();
  return ( 
    <>
      <div className="text-center m-6 my-20 md:m-20">
        <div className="heading1 black mb-16">
          <p>Email sudah dikirim!</p>
          <p>Segera cek email kamu, ya!</p>
        </div>
        <p>
            Kembali ke laman <span className="underline" onClick={()=>navigate('/login')}>Log in</span> 
        </p>
      </div>
    </>
  );
}

export default Confirmation;