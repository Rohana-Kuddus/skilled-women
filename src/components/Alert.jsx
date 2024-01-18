import ErrorWarningLineIcon from "remixicon-react/ErrorWarningLineIcon"
import CheckLineIcon from "remixicon-react/CheckLineIcon"
import CloseLineIcon from "remixicon-react/CloseLineIcon"
import PropTypes from "prop-types"
import ButtonPrimary from "./ButtonPrimary"
import ButtonSecondary from "./ButtonSecondary"

function Alert({ status, text, button = { primary: '', secondary: '' }, closeBtn }) {
  return (
    <div>
      {/* perlu ditambah function close button */}
      {closeBtn ? <CloseLineIcon color="#4F6C6A"></CloseLineIcon> : ''}

      <div>
        {status ? <CheckLineIcon color="green"></CheckLineIcon> : <ErrorWarningLineIcon color="red"></ErrorWarningLineIcon>}
        <p className="paragraph-regular green">{text}</p>

        {/* akan ditambah props text ketika sudah dibuat komponen button nya. contoh:
          <ButtonPrimary text={button.primary}></ButtonPrimary>
          <ButtonSecondary text={button.secondary}></ButtonSecondary>
        */}
        <div>
          {button.primary !== '' ? <ButtonPrimary></ButtonPrimary> : ''}
          {button.secondary !== '' ? <ButtonSecondary></ButtonSecondary> : ''}
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