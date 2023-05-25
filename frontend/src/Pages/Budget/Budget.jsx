import { useSelector, useDispatch } from 'react-redux';
import './Budget.scss';
import Popup from '../../Components/Popup/Popup';
import SpendingPopup from '../../Components/SpendingPopup/SpendingPopup';
import EarningPopup from '../../Components/EarningPopup/EarningPopup';
import { toggleSpendingPopup, toggleEarningPopup } from '../../store/slices/togglePopupSlice';

export default function Budget() {
  const dispatch = useDispatch();

  const isEarningPopupOpen = useSelector((state) => state.popup.isEarningPopupOpen);
  const isSpendingPopupOpen = useSelector((state) => state.popup.isSpendingPopupOpen);

  const handleSpendingClick = () => {
    dispatch(toggleSpendingPopup(true));
  };
  const handleEarningClick = () => {
    dispatch(toggleEarningPopup(true));
  };

  const closeSpendingPopup = () => {
    dispatch(toggleSpendingPopup(false));
  };
  const closeEarningPopup = () => {
    dispatch(toggleEarningPopup(false));
  };

  return (
    <section className="budget">
      <div className="budget__button-wrapper">
        <button type="button" className="budget__add-button" onClick={handleSpendingClick}>
          Расход
        </button>

        <button type="button" className="budget__add-button" onClick={handleEarningClick}>
          Доход
        </button>
      </div>
      {isSpendingPopupOpen && (
        <Popup onClose={closeSpendingPopup}>
          <SpendingPopup />
        </Popup>
      )}

      {isEarningPopupOpen && (
        <Popup onClose={closeEarningPopup}>
          <EarningPopup />
        </Popup>
      )}
    </section>
  );
}
