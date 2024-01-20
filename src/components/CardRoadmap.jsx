// langkah roadmap

import { useState } from "react";

function CardRoadmap({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  return ( 
    <div>
      {isOpen && <SidebarClass data={data} setIsOpen={setIsOpen}></SidebarClass>}
    </div>
  );
}

export default CardRoadmap;