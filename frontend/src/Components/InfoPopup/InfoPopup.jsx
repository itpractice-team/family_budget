import './InfoPopup.scss';
import Popup from '../Popup/Popup';
import errorIcon from '../../Images/error.svg';
import successIcon from '../../Images/success.svg';

const infoPopupData = [
  {
    type: 'error',
    iconSrc: errorIcon,
    text: 'Ошибка',
    textClassName: 'info-popup__text_error',
  },
  {
    type: 'success',
    iconSrc: successIcon,
    message: 'Готово!',
    textClassName: 'info-popup__text_success',
  },
];

export default function InfoPopup({ onClose, content, title, subtitle, type }) {
  const { iconSrc, text, textClassName } = infoPopupData.find((data) => data.type === type) || {};

  return (
    <Popup onClose={onClose} popupSize="popup_info" title={title} subtitle={subtitle}>
      <div className="info-popup">
        <div className="info-popup__status">
          {iconSrc && <img src={iconSrc} alt="Иконка статуса" />}
          <p className={`info-popup__text ${textClassName}`}>{text}</p>
        </div>
        <div className="info-popup__content">{content}</div>
      </div>
    </Popup>
  );
}
