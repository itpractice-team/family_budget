import './AddOperationBlock.scss';
import usePopup from '../../utils/hooks/usePopup';
import SpendPopup from '../SpendPopup/SpendPopup';
import IncomePopup from '../IncomePopup/IncomePopup';
import TransferPopup from '../TransferPopup/TransferPopup';
import Button from '../../ui/Button/Button';
import plus from '../../Images/icons/plus.svg';

export default function AddOperationBlock() {
  const {
    isOpen: isSpendPopupOpen,
    openPopup: openSpendPopup,
    closePopup: closeSpendPopup,
  } = usePopup('spend');
  const {
    isOpen: isIncomePopupOpen,
    openPopup: openIncomePopup,
    closePopup: closeIncomePopup,
  } = usePopup('income');
  const {
    isOpen: isTransferPopupOpen,
    openPopup: openTransferPopup,
    closePopup: closeTransferPopup,
  } = usePopup('transfer');

  return (
    <section className="add-operation">
      <Button
        variant="secondary"
        content="icon-text"
        image={plus}
        text="Расход"
        size="medium"
        onClick={openSpendPopup}
      />
      <Button
        variant="secondary"
        content="icon-text"
        image={plus}
        text="Доход"
        size="medium"
        onClick={openIncomePopup}
      />
      <Button
        variant="secondary"
        content="icon-text"
        image={plus}
        text="Перевод"
        size="medium"
        onClick={openTransferPopup}
      />
      {isSpendPopupOpen && <SpendPopup onClose={closeSpendPopup} />}
      {isIncomePopupOpen && <IncomePopup onClose={closeIncomePopup} />}
      {isTransferPopupOpen && <TransferPopup onClose={closeTransferPopup} />}
    </section>
  );
}
