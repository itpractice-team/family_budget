import Popup from '../Popup/Popup';

export default function InfoPopup({ onClose, content, title, subtitle }) {
  return (
    <Popup onClose={onClose} popupSize="popup_info" title={title} subtitle={subtitle}>
      {content}
    </Popup>
  );
}
