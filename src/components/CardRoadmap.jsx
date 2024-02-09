import SidebarClass from "./SidebarClass"
import PropTypes from "prop-types"
import "../styles/components/CardRoadmap.css";

function CardRoadmap({ data, isOpen, setIsOpen }) {
  return (
    <div className="relative w-2/5">
      <div className="step">
        <h2 className="step-num">{data.step}</h2>
      </div>

      <div className="step-name">
        <p className="step-text" onClick={() => setIsOpen({ status: true, id: data.id })}>{data.name}</p>
      </div>

      {isOpen.status && isOpen.id === data.id && <SidebarClass data={data} setIsOpen={setIsOpen}></SidebarClass>}
    </div>
  );
}

CardRoadmap.propTypes = {
  data: PropTypes.object,
  isOpen: PropTypes.object,
  setIsOpen: PropTypes.func
}

export default CardRoadmap;