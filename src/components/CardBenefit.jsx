import PropTypes from "prop-types";

const CardBenefit = ({ icon, description }) => {
  return (
    <div className="text-center py-4 my-3 rounded-lg bg-[#F6DDD9]">
      <img src={icon} alt="benefit" className="mb-2" />
      <p className="paragraph-regular dark">{description}</p>
    </div>
  );
};

CardBenefit.propTypes = {
  icon: PropTypes.string,
  description: PropTypes.string,
};

export default CardBenefit;