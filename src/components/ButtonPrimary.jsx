import PropTypes from "prop-types";

const ButtonPrimary = ({ onClick, buttonText, padding = 'px-4' }) => {
  return (
    <div>
      <button onClick={onClick} 
      className={`center my-3 rounded-lg bg-[#4F6C6A] py-2 ${padding} paragraph-regular white 
        transition-all hover:opacity-95 focus:opacity-95 active:opacity-85 
        disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}>{buttonText}</button>
    </div>
  );
};

ButtonPrimary.propTypes = {
  onClick: PropTypes.func,
  buttonText: PropTypes.string.isRequired,
  padding: PropTypes.string
};

export default ButtonPrimary;

