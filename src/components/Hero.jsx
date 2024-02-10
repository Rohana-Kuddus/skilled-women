import PropTypes from "prop-types";

function Hero({ data }) {
  return (
    <div className="flex justify-around items-center flex-wrap my-12 gap-2 md:gap-0">
      <h1 className="heading1 green text-center">{data.title}</h1>
      <img
        src={data.image}
        alt={data.title.toLowerCase().replace(/\s+/g, "-")}
        className="w-64 md:w-[26rem] rounded-xl"
      />
    </div>
  );
}

Hero.propTypes = {
  data: PropTypes.object,
};

export default Hero;
