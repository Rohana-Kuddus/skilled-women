import SidebarClass from "./SidebarClass"
import PropTypes from "prop-types"

function CardRoadmap({ data, isOpen, setIsOpen }) {
  return (
    <div>
      <div className="bg-[#F6DDD9]">
        <h2 className="heading2 white">{data.step}</h2>
      </div>

      <div className="bg-[#4F6C6A] hover:cursor-pointer">
        <h3 className="heading3 white" onClick={() => setIsOpen({ status: true, id: data.id })}>{data.name}</h3>
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