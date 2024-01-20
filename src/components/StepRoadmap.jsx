import CardRoadmap from "./CardRoadmap";

function StepRoadmap({ data }) {
  return (
    // styling: buat roadmap step dan border garis2 mengelilingi roadmap
    <div>
      <div>
        {/* perlu bikin function map card roadmap diselingi arrow component */}
        {data.map(v => (
          <div key={v.id}>
            <CardRoadmap roadmap={v}></CardRoadmap>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StepRoadmap;