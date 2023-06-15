import { useDispatch, useSelector } from 'react-redux';
import './AddOperationBlock.scss';
import {
  toggleSpendPopup,
  toggleIncomePopup,
  toggleTransferPopup,
} from '../../store/slices/togglePopupSlice';
import Button from '../../ui/Button/Button';
import SpendPopup from '../SpendPopup/SpendPopup';
import IncomePopup from '../IncomePopup/IncomePopup';
import TransferPopup from '../TransferPopup/TransferPopup';
import plus from '../../Images/icons/plus.svg';
import minus from '../../Images/icons/minus.svg';
import arrow from '../../Images/icons/icon-arrow-right.svg';

export default function AddOperationBlock() {
  const dispatch = useDispatch();

  const { isIncomePopupOpen, isSpendPopupOpen, isTransferPopupOpen } = useSelector(
    (state) => state.popup,
  );

  const handleSpendClick = () => dispatch(toggleSpendPopup(true));
  const handleIncomeClick = () => dispatch(toggleIncomePopup(true));
  const handleTransferClick = () => dispatch(toggleTransferPopup(true));

  const closeSpendPopup = () => dispatch(toggleSpendPopup(false));
  const closeIncomePopup = () => dispatch(toggleIncomePopup(false));
  const closeTransferPopup = () => dispatch(toggleTransferPopup(false));

  return (
    <section className="add-operation">
      <Button
        variant="secondary"
        content="icon-text"
        image={minus}
        text="Расход"
        size="medium"
        onClick={handleSpendClick}
      />
      <Button
        variant="secondary"
        content="icon-text"
        image={plus}
        text="Доход"
        size="medium"
        onClick={handleIncomeClick}
      />
      <Button
        variant="secondary"
        content="icon-text"
        image={arrow}
        text="Перевод"
        size="medium"
        onClick={handleTransferClick}
      />
      {isSpendPopupOpen && <SpendPopup onClose={closeSpendPopup} />}
      {isIncomePopupOpen && <IncomePopup onClose={closeIncomePopup} />}
      {isTransferPopupOpen && <TransferPopup onClose={closeTransferPopup} />}
    </section>
  );
}
