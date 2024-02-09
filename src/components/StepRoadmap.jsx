import { useParams } from "react-router-dom";
import Arrow from "./Arrow";
import CardRoadmap from "./CardRoadmap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoadmap } from "../redux/slices/roadmapSlice";
import SidebarClass from "./SidebarClass";

function StepRoadmap() {
  let flip = false;
  const dispatch = useDispatch();
  const { roadmap } = useSelector(state => state.roadmap);
  const params = useParams();
  const [isOpen, setIsOpen] = useState({ // controls sidebar class
    status: false,
    data: {}
  });
  
  useEffect(() => {
    dispatch(getRoadmap(params.id));
  }, [roadmap]);

  return (
    <div className="border-2 border-dashed border-[#4F6C6A] pt-10">
      <div className="flex flex-col justify-center align-middle">
        {roadmap.map((v, i)=> (
          <div className={`flex justify-center ${flip && 'flex-row-reverse'}`} key={v.id}>
            <CardRoadmap data={v} setIsOpen={setIsOpen}></CardRoadmap>
            <Arrow flip={flip} hidden={i !== 4 ? false : true}></Arrow>
            {(i + 1) % 2 === 0 ? flip = false : flip = true}
          </div>
        ))}
      </div>

      
      {isOpen.status && <SidebarClass data={isOpen.data} setIsOpen={setIsOpen}></SidebarClass>}
    </div>
  );
}

export default StepRoadmap;