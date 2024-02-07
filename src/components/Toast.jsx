import "../styles/components/Toast.css"

function Toast({ message }) {
  return (
    <div className="toast">
      <p className="paragraph-regular dark">{message}</p>
    </div>
  );
}

export default Toast;