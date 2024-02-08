import React from "react";
import PropTypes from "prop-types"
import "../index.css";

function ButtonSecondary({ name, action, padding = "px-2", height = "h-2" }) {
  return (
    <>
      <button className={`paragraph-regular dark ${padding} ${height} rounded-lg hover:bg-gray-100 w-max`}
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