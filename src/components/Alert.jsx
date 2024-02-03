import ErrorWarningLineIcon from "remixicon-react/ErrorWarningLineIcon"
import CheckLineIcon from "remixicon-react/CheckLineIcon"
import CloseLineIcon from "remixicon-react/CloseLineIcon"
import PropTypes from "prop-types"
import ButtonPrimary from "./ButtonPrimary"
import ButtonSecondary from "./ButtonSecondary"
import { useDispatch } from "react-redux"
import { setStatus } from "../redux/slices/alertSlice"
// import Alert from "../styles/components/alert.Css"

import "../index.css"
import "../styles/components/Alert.css"

function Alert({ status, text, button, closeBtn }) {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
      {closeBtn ? <CloseLineIcon color="#4F6C6A" onClick={() => dispatch(setStatus(false))}></CloseLineIcon> : ''}

      <div className="pop-up-inner p-2 rounded w-2/5 h-auto text-center">
        {status ? <CheckLineIcon color="green"></CheckLineIcon> : <ErrorWarningLineIcon className="w-37.5" color="red"></ErrorWarningLineIcon>}
        <p className="paragraph-regular green" dangerouslySetInnerHTML={{ __html: text }}></p>

        <div className="flex flex-row justify-center">
          {button.secondary ? <ButtonSecondary name={button.secondary} action={button.secondaryAction}></ButtonSecondary> : ''}
          {button.primary ? <ButtonPrimary buttonText={button.primary} onClick={button.primaryAction}></ButtonPrimary> : ''}
        </div>
      </div>
    </div>
  );
}

Alert.propTypes = {
  status: PropTypes.bool,
  text: PropTypes.string,
  button: PropTypes.object,
  closeBtn: PropTypes.bool
}

export default Alert;