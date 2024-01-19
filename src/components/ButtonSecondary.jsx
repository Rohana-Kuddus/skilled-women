import React from "react";
import PropTypes from "prop-types"
import "../index.css";

function ButtonSecondary({ name, action }) {
  return (
    <>
      <button
      className="dark px-3 py-2 rounded-lg hover:bg-white"
      style={{
        fontFamily: "var(--paragraph-font)",
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
  action: PropTypes.func
}

export default ButtonSecondary;