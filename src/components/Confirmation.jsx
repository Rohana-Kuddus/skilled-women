// konfirmasi email terkirim
import { useNavigate } from 'react-router-dom'

function Confirmation() {
  const navigate = useNavigate();
  return ( 
    <div>
      <div className="text-center">
        <div className="heading1 black">
          <p>Email sudah dikirim!</p>
          <p>Segera cek email kamu, ya!</p>
        </div>

        <p>
            Kembali ke laman <span className="underline" onClick={()=>navigate('/login')}>Log in</span> 
        </p>
      </div>
    </div>
  );
}

export default Confirmation;