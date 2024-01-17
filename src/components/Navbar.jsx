import { Link } from "react-router-dom";

function Navbar() {
  return ( 
    <div>
      {/* masukin link untuk pakai navbar */}
      <Link to='/'>Home</Link>
      <Link to='/jobs'>Pekerjaan</Link>
      <Link to='/about'>Tentang Kami</Link>
      <Link to='/faq'>FAQ</Link>
    </div>
  );
}

export default Navbar;