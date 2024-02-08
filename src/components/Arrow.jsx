import "../styles/components/Arrow.css"
import PropTypes from "prop-types"

function Arrow({ flip }) {
  return (
    <div className={flip ? 'scale-x-[-1]' : ''}>
      <div className="arrow x-line"></div>
      <div className="arrow y-line"></div>
      <div className="arrow down"></div>
    </div>
  );
}

Arrow.propTypes = {
  flip: PropTypes.bool
}

export default Arrow;