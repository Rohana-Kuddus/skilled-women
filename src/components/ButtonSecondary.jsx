import React from "react";
import PropTypes from "prop-types"
import "../index.css";

function ButtonSecondary({ name, action, padding = "px-4" }) {
  return (
    <>
      <button className={`paragraph-regular dark ${padding} py-2 rounded-lg hover:bg-[#EDEDED] w-max`}
      style={{
        borderColor: "var(--primary-color)",
        borderWidth: "1px",
      }}
      onClick={action}
    >
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