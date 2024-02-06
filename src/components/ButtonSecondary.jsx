import React from "react";
import PropTypes from "prop-types"
import "../index.css";

function ButtonSecondary({ name, action, padding = "px-4" }) {
  return (
    <>
      <button className={`paragraph-regular dark ${padding} py-2 rounded-lg hover:bg-gray-100 border
       border-[#4F6C6A]`} onClick={action}>
        {name}
      </button>
    </>
  );
}

ButtonSecondary.propTypes = {
  name: PropTypes.string,
  action: PropTypes.func,
  padding: PropTypes.string,
  height: PropTypes.string,
}

export default ButtonSecondary;