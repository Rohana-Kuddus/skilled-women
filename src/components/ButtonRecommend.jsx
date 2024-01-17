import ChatQuoteLineIcon from "remixicon-react/ChatQuoteLineIcon"
import "../index.css"

function ButtonRecommend({ name }) {
  return ( 
    <div>
      <button className="flex bg-[#EDEDED] justify-center items-start px-4 py-2 rounded-lg paragraph green">
        <ChatQuoteLineIcon className="mr-2 green"></ChatQuoteLineIcon> 
        Rekomendasikan {name}
      </button>
    </div>
  );
}

export default ButtonRecommend;