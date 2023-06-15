import './InfoPopup.scss';
import Popup from '../Popup/Popup';

export default function InfoPopup({ onClose, content }) {
  return (
    <Popup onClose={onClose} popupSize="popup_s">
      {content}
    </Popup>
  );
}
