// page roadmap pekerjaan

import ButtonRecommendation from "./ButtonRecommendation";
import StepRoadmap from "./StepRoadmap";

function Roadmap({ data }) {
  // function hit redux api roadmap pakai id pekerjaan

  // dummy data roadmap. contoh bentuk data
  const roadmap = [
    {
      id: 1,
      name: 'Pengenalan petani hidroponik 1',
      step: 1
    },
    {
      id: 2,
      name: 'Pengenalan petani hidroponik 2',
      step: 2
    },
    {
      id: 3,
      name: 'Pengenalan petani hidroponik 3',
      step: 3
    },
    {
      id: 4,
      name: 'Pengenalan petani hidroponik 4',
      step: 4
    },
    {
      id: 5,
      name: 'Pengenalan petani hidroponik 5',
      step: 5
    }
  ]

  return ( 
    <div>
      <StepRoadmap data={roadmap}></StepRoadmap>
    </div>
  );
}

export default Roadmap;