import CardBenefit from "./CardBenefit"
import ButtonPrimary from "./ButtonPrimary"
import PropTypes from "prop-types"

function Introduction({ data, setIsActive }) {
  return (
    <div>
      {/* introduction */}
      <div>
        <h2 className="heading2 green">Siapa itu {data.title}?</h2>
        <p className="paragraph-regular dark">{data.description}</p>

        {/* statistics */}
        <div>
          <div>
            <div>
              <h1 className="heading1 green">{data.percentage}</h1>
              <p className="paragraph-small green">{data.percentageScope === 'IND' ? 'di Indonesia' : 'di Dunia'}</p>
              <h3 className="heading3 green">Persentase Perempuan</h3>
              <a href={data.percentageLink} className="paragraph-small dark" target="_blank">src:</a>
            </div>
            <div>
              <img src={data.Industry.image} alt={data.Industry.name.toLowerCase().replace(/\s+/g, '-')} />
              <h3 className="heading3 green">Industri {data.Industry.name}</h3>
            </div>
          </div>
        </div>

        <h1 className="heading1 green">{data.income}</h1>
        <h3 className="heading3 green">Estimasi Pendapatan</h3>
        <a href={data.incomeLink} className="paragraph-small dark" target="_blank">src:</a>
      </div>

      {/* benefits */}
      <div>
        <h2 className="heading2 green">Apa keunggulan {data.title}?</h2>
        <div className="">
          {data.benefits.map((v, i) => (
            <div key={i}>
              <CardBenefit icon={v.image} description={v.description}></CardBenefit>
            </div>
          ))}
        </div>
      </div>

      {/* video */}
      <div>
        <h2 className="heading2 green">Bagaimana Kehidupan {data.title}?</h2>
        <iframe width="560" height="315" src={data.video} title="YouTube video player" frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen></iframe>
      </div>

      {/* figure */}
      <div>
        <h2 className="heading2 green">Perempuan Inspiratif {data.title}</h2>
        <div>
          <img src={data.Figure.image} alt={data.Figure.name.toLowerCase().replace(/\s+/g, '-')} />
          <div>
            <h2 className="heading2 green">{data.Figure.name}</h2>
            <h3 className="hedaing3 green">{data.Figure.role}</h3>
            <p className="paragraph-regular dark">{data.Figure.description}</p>
          </div>
        </div>
      </div>

      <ButtonPrimary buttonText={'Ketahui Langkah-Langkahnya'} onClick={() => setIsActive('roadmap')}></ButtonPrimary>
    </div>
  );
}

Introduction.propTypes = {
  data: PropTypes.object,
  setIsActive: PropTypes.func
}

export default Introduction;