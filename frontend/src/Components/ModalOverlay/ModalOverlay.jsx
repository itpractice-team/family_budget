/* eslint-disable jsx-a11y/no-static-element-interactions */
import './ModalOverlay.scss';

export default function ModalOverlay({ onClose }) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, react/self-closing-comp
    <div className="overlay" onClick={onClose}></div>
  );
}
