function ButtonPrimary({ text, action }) {
  return ( 
    <div>
      <button onClick={action}>{text}</button>
    </div>
  );
}

export default ButtonPrimary;