import React from "react";
import PropTypes from "prop-types"
import "../index.css";

function ButtonSecondary({ name, action }) {
  return (
    <>
      <button
      className="paragraph-regular dark px-4 py-2 rounded-lg hover:bg-gray-100"
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
  action: PropTypes.func
}

export default ButtonSecondary;