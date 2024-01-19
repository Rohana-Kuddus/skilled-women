import React from "react";
import "../index.css";

const ButtonSecondary1 = ({ text, onClick }) => {
  return (
    <button
      className="dark bg-gray-100 p-3 rounded-lg"
      style={{ fontFamily: "var(--paragraph-font)" }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const ButtonSecondary2 = ({ text, onClick }) => {
  return (
    <button
      className="dark p-3 rounded-lg"
      style={{
        fontFamily: "var(--paragraph-font)",
        borderColor: "var(--primary-color)",
        borderWidth: "1px",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

function ButtonSecondary({ text, onClick }) {
  return (
    <>
      <ButtonSecondary1 onClick={onClick} text={text} />
      <ButtonSecondary2 onClick={onClick} text={text} />
    </>
  );
}

export default ButtonSecondary;