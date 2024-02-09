import SidebarClass from "./SidebarClass"
import PropTypes from "prop-types"
import "../styles/components/CardRoadmap.css";

function CardRoadmap({ data, isOpen, setIsOpen }) {
  return (
    <div className="relative w-2/5">
      <div className="step">
        <h2 className="absolute top-2 left-4 heading2 white">{data.step}</h2>
      </div>

      <div className="step-name">
        <h3 className="sm:paragraph-regular md:heading3 white" onClick={() => setIsOpen({ status: true, id: data.id })}>{data.name}</h3>
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