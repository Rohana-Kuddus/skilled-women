import "../styles/components/Toast.css"
import PropTypes from "prop-types"

function Toast({ message }) {
  return (
    <div className="toast">
      <p className="paragraph-regular dark">{message ? message : 'Memproses...'}</p>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string
}

export default Toast;