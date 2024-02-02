import { useParams } from "react-router-dom";
import Arrow from "./Arrow";
import CardRoadmap from "./CardRoadmap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoadmap } from "../redux/slices/roadmapSlice";


function StepRoadmap({ data }) {
  let flip = false;
  const dispatch = useDispatch();
  const { roadmap } = useSelector(state => state.roadmap);
  const params = useParams();
  const id = params.id
  console.log(id);
  
  // function hit redux api roadmap pakai id pekerjaan
  useEffect(() => {
    dispatch(getRoadmap(id))
  }, [])

  console.log('roadmap',roadmap);

  return (
    // styling: buat roadmap step dan border garis2 mengelilingi roadmap
    <div className="border-2 border-dashed border-[#4F6C6A] p-5">
      <div className="flex flex-wrap">
        {roadmap.map((v, i)=> (
          <div className={flip ? 'flex flex-row-reverse' : 'flex'} key={v.id}>
            <CardRoadmap roadmap={v} job={data}></CardRoadmap>
            {i !== 4 ? <Arrow flip={flip}></Arrow> : ''}
            {(i + 1) % 2 === 0 ? flip = false : flip = true}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StepRoadmap;