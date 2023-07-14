import './AddOperationBlock.scss';
import usePopup from '../../utils/hooks/usePopup';
import TransactionPopup from '../TransactionPopup/TransactionPopup';
import TransferPopup from '../TransferPopup/TransferPopup';
import Button from '../../ui/Button/Button';
import plus from '../../Images/icons/plus.svg';
import minus from '../../Images/icons/minus.svg';
import arrow from '../../Images/icons/icon-arrow-right.svg';

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
        image={minus}
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
        image={arrow}
        text="Перевод"
        size="medium"
        onClick={openTransferPopup}
      />
      {isSpendPopupOpen && (
        <TransactionPopup
          onClose={closeSpendPopup}
          popupSize="popup_s"
          title="Добавить расход"
          categoryType={1}
        />
      )}
      {isIncomePopupOpen && (
        <TransactionPopup
          onClose={closeIncomePopup}
          popupSize="popup_s"
          title="Добавить доход"
          categoryType={2}
        />
      )}
      {isTransferPopupOpen && <TransferPopup onClose={closeTransferPopup} />}
    </section>
  );
}
