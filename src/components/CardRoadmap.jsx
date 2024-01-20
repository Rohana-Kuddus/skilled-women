import { useState } from "react"
import SidebarClass from "./SidebarClass"

function CardRoadmap({ classes, roadmap }) {
  const [isOpen, setIsOpen] = useState(false);

  // data dummy kelas. isi dari props classes
  const classData = [
    {
      id: 1,
      username: 'userkeren',
      title: 'Kelas seru dan asik',
      paid: false,
      description: 'ini deskirpsi yang asik',
      rating: 24
    },
    {
      id: 2,
      username: 'userkeren',
      title: 'Kelas seru dan asik',
      paid: false,
      description: 'ini deskirpsi yang asik',
      rating: 24
    },
    {
      id: 3,
      username: 'userkeren',
      title: 'Kelas seru dan asik',
      paid: false,
      description: 'ini deskirpsi yang asik',
      rating: 24
    }
  ];

  // olah data untuk dikirim ke sidebar class
  const data = {
    name: roadmap.name,
    classes: classData
  };

  const sidebarHandler = () => {
    // dispacth hit redux api ambil kelas sesuai roadmap id

    setIsOpen(true);
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