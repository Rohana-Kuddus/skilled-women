import ErrorWarningLineIcon from "remixicon-react/ErrorWarningLineIcon"
import CheckLineIcon from "remixicon-react/CheckLineIcon"
import CloseLineIcon from "remixicon-react/CloseLineIcon"
import PropTypes from "prop-types"
import ButtonPrimary from "./ButtonPrimary"
import ButtonSecondary from "./ButtonSecondary"
import { useDispatch } from "react-redux"
import { setAlert } from "../redux/slices/alertSlice"
import "../index.css"
import "../styles/components/Alert.css"

function Alert({ status, text, button, closeBtn, name }) {
  const dispatch = useDispatch();

  return (
    <div className="close-Btn-div">
      <div className="pop-up-inner">
        {closeBtn && (
          <CloseLineIcon
            color="#4F6C6A"
            onClick={() => dispatch(setAlert({ alert: false, alertName: name }))}
            className="closeBtn"
          ></CloseLineIcon>
        )}

        {status ? <CheckLineIcon color="#73B234" className="status-icon"></CheckLineIcon>
          : <ErrorWarningLineIcon color="#E8A530" className="status-icon"></ErrorWarningLineIcon>}
        <h3 className="h3" dangerouslySetInnerHTML={{ __html: text }}></h3>

        <div className="button-alert">
          {button.secondary && <ButtonSecondary name={button.secondary} action={button.secondaryAction}></ButtonSecondary>}
          {button.primary && <ButtonPrimary buttonText={button.primary} onClick={button.primaryAction}></ButtonPrimary>}
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