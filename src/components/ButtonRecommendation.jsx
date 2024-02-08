import ChatQuoteLineIcon from "remixicon-react/ChatQuoteLineIcon";
import "../index.css";
import "../styles/components/ButtonRecommendation.css";
import PropTypes from "prop-types";

function ButtonRecommendation({ name, action, padding = "px-4" }) {
  return (
    <div>
      <button
        className={`button ${padding} paragraf md:text-base lg:text-lg paragraph-regular green`}
        onClick={action}
      >
        <ChatQuoteLineIcon className="mr-2 md:mr-3 lg:mr-4 green"></ChatQuoteLineIcon>
        Rekomendasikan {name}
      </button>
    </div>
  );
}

ButtonRecommendation.propTypes = {
  name: PropTypes.string,
  action: PropTypes.func,
  padding: PropTypes.string,
};

export default ButtonRecommendation;
