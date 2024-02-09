import "../styles/components/Arrow.css"
import PropTypes from "prop-types"

function Arrow({ flip, hidden }) {
  return (
    <div className={flip ? 'scale-x-[-1]' : ''}>
      <div className={`arrow x-line ${hidden ? 'border-white' : 'border-black'}`}></div>
      <div className={`arrow y-line ${hidden ? 'border-white' : 'border-black'}`}></div>
      <div className={`arrow down ${hidden ? 'border-white' : 'border-black'}`}></div>
    </div>
  );
}

Arrow.propTypes = {
  flip: PropTypes.bool,
  hidden: PropTypes.bool
}

export default Arrow;