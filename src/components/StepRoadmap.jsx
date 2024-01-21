import { useState } from "react";
import Arrow from "./Arrow";
import CardRoadmap from "./CardRoadmap";

function StepRoadmap({ data }) {
  let flip = false;

  return (
    // styling: buat roadmap step dan border garis2 mengelilingi roadmap
    <div className="border-2 border-dashed border-[#4F6C6A] p-5">
      <div className="flex flex-wrap">
        {data.map((v, i)=> (
          <div className={flip ? 'flex flex-row-reverse' : 'flex'} key={v.id}>
            {console.log(flip)}
            <CardRoadmap roadmap={v}></CardRoadmap>
            {i !== 4 ? <Arrow flip={flip}></Arrow> : ''}
            {(i + 1) % 2 === 0 ? flip = false : flip = true}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StepRoadmap;