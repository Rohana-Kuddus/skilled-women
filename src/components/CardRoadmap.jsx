import { useState } from "react"
import SidebarClass from "./SidebarClass"

function CardRoadmap({ roadmap, job }) {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarHandler = () => {
    setIsOpen(true);
  };

  const data = {
    classId: job.id,
    roadmapId: roadmap.id,
    name: roadmap.name
  };

  return (
    <div>
      <div className="bg-[#F6DDD9]">
        <h2 className="heading2 white">{roadmap.step}</h2>
      </div>

      <div className="bg-[#4F6C6A]">
        <h3 className="heading3 white" onClick={sidebarHandler}>{roadmap.name}</h3>
      </div>

      {isOpen && <SidebarClass data={data} setIsOpen={setIsOpen}></SidebarClass>}
    </div>
  );
}

export default CardRoadmap;