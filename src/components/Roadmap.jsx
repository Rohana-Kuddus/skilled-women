import ButtonRecommendation from "./ButtonRecommendation";
import StepRoadmap from "./StepRoadmap";

function Roadmap({ data }) {
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
    <div>
      <div className="bg-[#4F6C6A]">
        <h2 className="heading2 white">Roadmap</h2>
        <p className="paragraph-regular white">{data.roadmapSummary}</p>
      </div>

      {/* perlu ubah url jadi link gform rekomendasi roadmap */}
      <ButtonRecommendation name={'Roadmap'} action={() => window.open('url', '_blank', 'noreferrer')}></ButtonRecommendation>

      <StepRoadmap data={roadmap}></StepRoadmap>
    </div>
  );
}

export default Roadmap;