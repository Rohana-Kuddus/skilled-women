import ErrorWarningLineIcon from "remixicon-react/ErrorWarningLineIcon"
import CheckLineIcon from "remixicon-react/CheckLineIcon"
import CloseLineIcon from "remixicon-react/CloseLineIcon"
import PropTypes from "prop-types"
import ButtonPrimary from "./ButtonPrimary"
import ButtonSecondary from "./ButtonSecondary"
import ReactHtmlParser from "react-html-parser"
import { useDispatch } from "react-redux"
import { setStatus } from "../redux/slices/alertSlice"

function Alert({ status, text, button, closeBtn }) {
  const dispatch = useDispatch();

  return (
    <div>
      {closeBtn ? <CloseLineIcon color="#4F6C6A" onClick={() => dispatch(setStatus(false))}></CloseLineIcon> : ''}

      <div>
        {status ? <CheckLineIcon color="green"></CheckLineIcon> : <ErrorWarningLineIcon color="red"></ErrorWarningLineIcon>}
        <p className="paragraph-regular green">{ReactHtmlParser(text)}</p>

        <div>
          {button.primary ? <ButtonPrimary text={button.primary} action={button.primaryAction}></ButtonPrimary> : ''}
          {button.secondary ? <ButtonSecondary text={button.secondary} action={button.secondaryAction}></ButtonSecondary> : ''}
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