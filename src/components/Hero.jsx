import PropTypes from "prop-types";

function Hero({ data }) {
  return (
    <div className="flex justify-between items-center gap-59 p-20">
      <h1 className="heading1 green">{data.title}</h1>
      <img
        src={data.image}
        alt={data.title.toLowerCase().replace(/\s+/g, "-")}
      />
    </div>
  );
}

Hero.propTypes = {
  data: PropTypes.object,
};

export default Hero;
