import { useState } from "react"
import SidebarClass from "./SidebarClass"

function CardRoadmap({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarHandler = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div className="bg-[#F6DDD9]">
        <h2 className="heading2 white">{data.step}</h2>
      </div>

      <div className="bg-[#4F6C6A]">
        <h3 className="heading3 white" onClick={sidebarHandler}>{data.name}</h3>
      </div>

      {isOpen && <SidebarClass data={data} setIsOpen={setIsOpen}></SidebarClass>}
    </div>
  );
}

export default CardRoadmap;