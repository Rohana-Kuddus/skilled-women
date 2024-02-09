import PropTypes from "prop-types";

const CardBenefit = ({ icon, description }) => {
  return (
    <>
    <div className="text-center px-4 py-12 m-2 md:mx-4 w-56 rounded-xl bg-[#F6DDD9]">
      <img src={icon} alt="benefit" className="w-20 h-full mx-auto mb-4" />
      <p className="paragraph-regular dark">{description}</p>
    </div>
    </>
  );
};

CardBenefit.propTypes = {
  icon: PropTypes.string,
  description: PropTypes.string,
};

export default CardBenefit;