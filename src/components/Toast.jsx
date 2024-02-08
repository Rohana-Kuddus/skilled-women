import "../styles/components/Toast.css"
import PropTypes from "prop-types"

function Toast({ message }) {
  return (
    <div className="toast">
      <p className="paragraph-regular dark">{typeof message !== 'string' || message !== '' 
        ? message : 'Loading...'}</p>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string
}

export default Toast;