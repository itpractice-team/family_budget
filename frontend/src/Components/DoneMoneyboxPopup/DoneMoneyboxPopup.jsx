import './DoneMoneyboxPopup.scss';
import Popup from '../Popup/Popup';
import Button from '../../ui/Button/Button';
import ProgressBar from '../ProgressBar/ProgressBar';
import envelope from '../../Images/envelope-done.svg';

export default function DoneMoneyboxPopup({ onClose, moneybox }) {
  const { amount, accumulated } = moneybox;

  return (
    <Popup onClose={onClose} popupSize="popup_done" title={moneybox.name} subtitle="Конверт">
      <p className="total">
        <span className="total-balance">{accumulated}</span> /
        <span className="total-target">{amount}</span>
      </p>
      <ProgressBar balance={accumulated} target={amount} />
      <div className="donemoneybox__content">
        <h3 className="donemoneybox__title">Вы достигли цели!</h3>
        <img className="donemoneybox__image" src={envelope} alt="" />
        <Button type="submit" variant="primary" content="text" text="Потратить" size="medium" />
      </div>
    </Popup>
  );
}
