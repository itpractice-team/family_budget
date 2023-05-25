import './PopupOverlay.scss';

export default function PopupOverlay({ onClose }) {
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  return <div className="overlay" onClick={onClose} />;
}
