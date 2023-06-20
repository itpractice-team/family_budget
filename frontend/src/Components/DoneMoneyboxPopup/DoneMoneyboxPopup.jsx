import './DoneMoneyboxPopup.scss';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';
import envelope from '../../Images/envelope-done.svg';

export default function DoneMoneyboxPopup({ onClose, title }) {
  const balance = 3000;
  const target = 3000;

  return (
    <Popup onClose={onClose} popupSize="popup_done" title={title} subtitle="Конверт">
      <p className="total">
        <span className="total-balance">{balance}</span> /
        <span className="total-target">{target}</span>
      </p>
      <ProgressBar balance={balance} target={target} />
      <div className="donemoneybox__content">
        <h3 className="donemoneybox__title">Вы достигли цели!</h3>
        <img className="donemoneybox__image" src={envelope} alt="" />
        <Button variant="primary" type="text" text="Потратить" size="medium" />
      </div>
    </Popup>
  );
}
