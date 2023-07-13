import './InfoPopup.scss';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import errorIcon from '../../Images/error.svg';
import successIcon from '../../Images/success.svg';

const infoPopupData = [
  {
    type: 'error',
    iconSrc: errorIcon,
    text: 'Ошибка',
    textClassName: 'info-popup__text_error',
    textButton: 'Попробовать снова',
  },
  {
    type: 'success',
    iconSrc: successIcon,
    text: 'Готово!',
    textClassName: 'info-popup__text_success',
    textButton: 'Отлично!',
  },
];

export default function InfoPopup({ onClose, content, title, subtitle, type, onClick }) {
  const { iconSrc, text, textClassName, textButton } =
    infoPopupData.find((data) => data.type === type) || {};

  const handleClick = () => (type === 'success' ? onClose() : onClick());

  return (
    <Popup onClose={onClose} popupSize="popup_info" title={title} subtitle={subtitle}>
      <div className="info-popup">
        <div className="info-popup__status">
          {iconSrc && <img src={iconSrc} alt="Иконка статуса" />}
          <p className={`info-popup__text ${textClassName}`}>{text}</p>
        </div>
        <div className="info-popup__content">{content}</div>
      </div>
      <Button
        type="submit"
        variant="primary"
        content="text"
        text={textButton}
        size="medium"
        onClick={handleClick}
      />
    </Popup>
  );
}
