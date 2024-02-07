import ErrorWarningLineIcon from "remixicon-react/ErrorWarningLineIcon"
import CheckLineIcon from "remixicon-react/CheckLineIcon"
import CloseLineIcon from "remixicon-react/CloseLineIcon"
import PropTypes from "prop-types"
import ButtonPrimary from "./ButtonPrimary"
import ButtonSecondary from "./ButtonSecondary"
import { useDispatch } from "react-redux"
import { setAlert } from "../redux/slices/alertSlice"

function Alert({ status, text, button, closeBtn, name }) {
  const dispatch = useDispatch();

  return (
    <div>
      {closeBtn ? <CloseLineIcon className="hover:cursor-pointer" color="#4F6C6A" onClick={() => dispatch(setAlert({ alert: false, alertName: name }))}></CloseLineIcon> : ''}

      <div>
        {status ? <CheckLineIcon color="#73B234"></CheckLineIcon> : <ErrorWarningLineIcon color="#E8A530"></ErrorWarningLineIcon>}
        <p className="paragraph-regular green" dangerouslySetInnerHTML={{ __html: text }}></p>

        <div>
          {button.primary ? <ButtonPrimary buttonText={button.primary} onClick={button.primaryAction}></ButtonPrimary> : ''}
          {button.secondary ? <ButtonSecondary name={button.secondary} action={button.secondaryAction}></ButtonSecondary> : ''}
        </div>
      </div>
    </div>
  );
}

Alert.propTypes = {
  status: PropTypes.bool,
  text: PropTypes.string,
  button: PropTypes.object,
  closeBtn: PropTypes.bool,
  name: PropTypes.string
}

export default Alert;