import PropTypes from "prop-types";

const CardBenefit = ({ icon, description }) => {
  return (
    // <div className="flex text-center justify-between py-4 px-6 my-3 ml-4  green relative w-64 h-72 flex-col rounded-3xl bg-[#F6DDD9] paragraph-regular shadow-md">
    <div className="flex flex-col text-center justify-between py-4 px-6 my-3 ml-4 green relative w-64 h-72 rounded-3xl bg-[#F6DDD9] paragraph-regular shadow-md">
      <div className="mb-4" >{icon}</div>
      <p className="flex-1 break-all">{description}</p>
    </div>
  );
};

CardBenefit.propTypes = {
  icon: PropTypes.element.isRequired,
  description: PropTypes.string.isRequired,
};

export default CardBenefit;