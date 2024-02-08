import CardBenefit from "./CardBenefit"
import ButtonPrimary from "./ButtonPrimary"
import PropTypes from "prop-types"
import "../styles/components/Introduction.css"

function Introduction({ data, setIsActive }) {
  return (
    <>
      {/* introduction */}
      <div className="introContainer">
        <div className="text-center md:text-left mb-8 md:mb-0">
          <h2 className="heading2 green">Siapa itu {data.title}?</h2>
          <p className="paragraph-regular dark">{data.description}</p>
        </div>
        {/* statistics */}
        <div className="introStatistic">
            <div className="p-4 border-2 rounded-3xl border-[#F6DDD9]">
              <h1 className="heading1 green">{data.percentage}</h1>
              <p className="paragraph-small green">{data.percentageScope === 'IND' ? 'di Indonesia' : 'di Dunia'}</p>
              <h3 className="heading3 green">Persentase</h3>
              <h3 className="heading3 green">Perempuan</h3>
              <a href={data.percentageLink} className="paragraph-small dark" target="_blank">src:</a>
            </div>
            <div className="p-4 border-2 rounded-3xl border-[#F6DDD9] bg-[#F6DDD9] max-w-60">
              <img src={data.Industry.image} alt={data.Industry.name.toLowerCase().replace(/\s+/g, '-')} className="w-20 h-auto mx-auto mb-2"/>
              <h3 className="heading3 green">Industri {data.Industry.name}</h3>
            </div>
            <div className="p-4 col-span-2 border-2 rounded-3xl border-[#F6DDD9]">
              <h1 className="heading1 green">{data.income}</h1>
              <h3 className="heading3 green">Estimasi Pendapatan</h3>
              <a href={data.incomeLink} className="paragraph-small dark" target="_blank">src:</a>
            </div>
        </div>

      </div>

      <div className="introBenefit">
      {/* benefits */}
      <div className="m-8">
        <h2 className="heading2 green mb-8">Apa keunggulan {data.title}?</h2>
        <div className="introBenefitContainer">
          {data.benefits.map((v, i) => (
            <div key={i}>
              <CardBenefit icon={v.image} description={v.description}></CardBenefit>
            </div>
          ))}
        </div>
      </div>

      {/* video */}
      <div className="m-8">
        <h2 className="heading2 green mb-6">Bagaimana Kehidupan {data.title}?</h2>
        <iframe width="560" height="315" src={data.video} title="YouTube video player" frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen className="rounded-2xl max-w-72 md:max-w-none mx-auto">
        </iframe>
      </div>

      {/* figure */}
      <div className="m-8">
        <h2 className="heading2 green mb-12">Perempuan Inspiratif {data.title}</h2>
        <div className="figure">
          <img src={data.figure.image} alt={data.figure.name.toLowerCase().replace(/\s+/g, '-')} className="max-w-40 mx-auto rounded-2xl"/>
          <div className="figureContainer">
            <h2 className="heading2 green">{data.figure.name}</h2>
            <h3 className="hedaing3 green">{data.figure.role}</h3>
            <p className="paragraph-regular dark">{data.figure.description}</p>
          </div>
        </div>
      </div>

      <ButtonPrimary buttonText={'Ketahui Langkah-Langkahnya'} onClick={() => setIsActive('roadmap')} padding="p-6"></ButtonPrimary>
      </div>
    </>
  );
}

Introduction.propTypes = {
  data: PropTypes.object,
  setIsActive: PropTypes.func
}

export default Introduction;