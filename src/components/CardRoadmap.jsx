import PropTypes from "prop-types"
import "../styles/components/CardRoadmap.css";

function CardRoadmap({ data, setIsOpen }) {
  return (
    <div className="relative w-2/5">
      <div className="step">
        <h2 className="step-num">{data.step}</h2>
      </div>

      <div className="step-name">
        <p className="step-text" onClick={() => setIsOpen({ status: true, data })}>{data.name}</p>
      </div>
    </div>
  );
}

CardRoadmap.propTypes = {
  data: PropTypes.object,
  setIsOpen: PropTypes.func
}

export default CardRoadmap;