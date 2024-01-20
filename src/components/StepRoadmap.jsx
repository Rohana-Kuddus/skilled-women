import CardRoadmap from "./CardRoadmap";

function StepRoadmap({ data }) {
  return (
    <div>
      {/* perlu bikin function map card roadmap diselingi arrow component */}
      {data.map(v => (
        <div key={v.id}>
          <CardRoadmap roadmap={v}></CardRoadmap>
        </div>
      ))}
    </div>
  );
}

export default StepRoadmap;