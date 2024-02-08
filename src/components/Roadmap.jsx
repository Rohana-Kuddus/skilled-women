import ButtonRecommendation from "./ButtonRecommendation";
import StepRoadmap from "./StepRoadmap";
import "../styles/components/Roadmap.css"

function Roadmap({ data }) {
  return (
    <div>
      <div className="bg-[hsl(176,16%,37%)] my-12">
        <h2 className="heading2 white">Roadmap</h2>
        <p className="paragraph-regular white">{data.roadmapSummary}</p>
      </div>

      {/* perlu ubah url jadi link gform rekomendasi roadmap */}
      <ButtonRecommendation name={'Roadmap'} action={() => window.open('url', '_blank', 'noreferrer')}></ButtonRecommendation>

      <StepRoadmap data={data}></StepRoadmap>
    </div>
  );
}

export default Roadmap;