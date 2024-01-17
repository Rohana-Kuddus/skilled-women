import ChatQuoteLineIcon from "remixicon-react/ChatQuoteLineIcon"
import "../index.css"
import "../styles/components/ButtonRecommendation.css"

function ButtonRecommendation({ name }) {
  return ( 
    <div>
      <button className="button paragraph-regular green">
        <ChatQuoteLineIcon className="mr-2 green"></ChatQuoteLineIcon> 
        Rekomendasikan {name}
      </button>
    </div>
  );
}

export default ButtonRecommendation;