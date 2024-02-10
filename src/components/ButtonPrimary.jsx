import PropTypes from "prop-types";

const ButtonPrimary = ({ onClick, buttonText, padding = "px-4", submit = false, margin = "my-3" }) => {
  return (
    <div>
      <button
        type={!submit ? 'button' : 'submit'}
        onClick={onClick}
        className={`center my-3 rounded-md bg-[#4F6C6A] py-2 ${padding} ${margin} paragraph-regular white 
        transition-all delay-200 hover:bg-[#374f4e]`}
      >
        {buttonText}
      </button>
    </div>
  );
};

ButtonPrimary.propTypes = {
  onClick: PropTypes.func,
  buttonText: PropTypes.string.isRequired,
  padding: PropTypes.string,
  submit: PropTypes.bool,
  margin: PropTypes.string
};

export default ButtonPrimary;
