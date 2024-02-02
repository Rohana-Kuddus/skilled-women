import Arrow from "./Arrow";
import CardRoadmap from "./CardRoadmap";

function StepRoadmap({ data }) {
  let flip = false;

  // function hit redux api roadmap pakai id pekerjaan

  // dummy data roadmap. contoh bentuk data dari redux
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