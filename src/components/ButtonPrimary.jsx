import React from "react";
import PropTypes from "prop-types";

const ButtonPrimary = ({ onClick, buttonText }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="center my-3 ml-4 rounded-lg bg-[#4F6C6A] py-2 px-5 paragraph-regular text-white transition-all hover:opacity-95 focus:opacity-95 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        {buttonText}
      </button>
    </div>
  );
};

ButtonPrimary.propTypes = {
  onClick: PropTypes.func, 
  buttonText: PropTypes.string.isRequired,
};


export default ButtonPrimary;


// hasil penggunaaan di app.jsx
{/* <Button buttonText="Lihat kelas" />
<Button buttonText="Simpan" />
<Button buttonText="Login" /> */}

