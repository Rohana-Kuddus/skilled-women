import CardBenefit from "./CardBenefit"
import ButtonPrimary from "./ButtonPrimary"
import PropTypes from "prop-types"

function Introduction({ data, setIsActive }) {
  return (
    <>
      {/* introduction */}
      <div className="flex flex-col md:flex-row justify-center gap-x-0 md:gap-x-12 m-8 place-items-center">
        <div className="text-center md:text-left md:flex-auto w-64 md:pr-20 mb-8 md:mb-0">
          <h2 className="heading2 green mb-4">Siapa itu {data.title}?</h2>
          <p className="paragraph-regular dark">{data.description}</p>
        </div>
        {/* statistics */}
        <div className="grid grid-cols-2 w-96 md:w-5/12 gap-2 md:gap-6">
            <div className="flex flex-col justify-center items-center relative flex-wrap p-4 border-2 rounded-3xl border-[#F6DDD9]">
              <h1 className="heading1 green pl-3 -mb-2">{data.percentage}</h1>
              <p className="paragraph-small green mb-2">{data.percentageScope === 'IND' ? 'di Indonesia' : 'di Dunia'}</p>
              <p className="font-h4 green text-center mb-2">Persentase Perempuan</p>
              <a href={data.percentageLink} className="paragraph-small dark absolute bottom-0 right-0 mr-4 mb-2" target="_blank">src:</a>
            </div>

            <div className="py-6 px-4 border-2 rounded-3xl border-[#F6DDD9] bg-[#F6DDD9] max-w-60 text-center">
              <img src={data.Industry.image} alt={data.Industry.name.toLowerCase().replace(/\s+/g, '-')} className="w-20 h-auto mx-auto"/>
              <h3 className="font-h4 green mt-4">Industri {data.Industry.name}</h3>
            </div>

            <div className="px-4 py-6 col-span-2 relative border-2 rounded-3xl border-[#F6DDD9]">
              <h1 className="heading1 green text-center">{data.income}</h1>
              <h3 className="font-h4 green text-center">Estimasi Pendapatan</h3>
              <a href={data.incomeLink} className="paragraph-small dark absolute bottom-0 right-0 mr-4 mb-2" target="_blank">src:</a>
            </div>
        </div>

      </div>

      <div className="flex flex-col items-center justify-center text-center">
      {/* benefits */}
      <div className="m-8">
        <h2 className="heading2 green mb-8">Apa keunggulan {data.title}?</h2>
        <div className="flex justify-center items-center px-32 flex-wrap">
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
        <h2 className="heading2 green mb-6">Perempuan Inspiratif {data.title}</h2>
        <div className="bg-[#F6DDD9] grid grid-row md:flex justify-between md:gap-8 w-4/5 place-items-center p-8 rounded-2xl m-auto">
          <img src={data.Figure.image} alt={data.Figure.name.toLowerCase().replace(/\s+/g, '-')} className=" max-h-48 md:max-w-40 mx-auto rounded-lg"/>
          <div className="text-center md:text-left mt-6 md:my-auto md:place-self-start">
            <h2 className="heading2 green">{data.Figure.name}</h2>
            <h3 className="hedaing3 green">{data.Figure.role}</h3>
            <p className="paragraph-regular dark">{data.Figure.description}</p>
          </div>
        </div>
      </div>

      <ButtonPrimary buttonText={'Ketahui Langkah-Langkahnya'} onClick={() => setIsActive('roadmap')} padding="px-8 py-4"></ButtonPrimary>
      </div>
    </>
  );
}

Introduction.propTypes = {
  data: PropTypes.object,
  setIsActive: PropTypes.func
}

export default Introduction;