import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './Budget.scss';
import SpendingPopup from '../../Components/SpendingPopup/SpendingPopup';
import EarningPopup from '../../Components/EarningPopup/EarningPopup';
import { toggleSpendingPopup, toggleEarningPopup } from '../../store/slices/togglePopupSlice';
import { getUser } from '../../store/slices/userSlice';
import Button from '../../ui/Button/Button';

export default function Budget() {
  const dispatch = useDispatch();

  const isEarningPopupOpen = useSelector((state) => state.popup.isEarningPopupOpen);
  const isSpendingPopupOpen = useSelector((state) => state.popup.isSpendingPopupOpen);
  const isFetched = useSelector((state) => state.user.isFetched);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getUser());
    }
  }, [dispatch, isFetched]);

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
        <Button
          variant="secondary"
          type="icon-text"
          text="Расход"
          size="medium"
          onClick={handleSpendingClick}
        />
        <Button
          variant="secondary"
          type="icon-text"
          text="Доход"
          size="medium"
          onClick={handleEarningClick}
        />
      </div>
      {isSpendingPopupOpen && <SpendingPopup onClose={closeSpendingPopup} />}

      {isEarningPopupOpen && <EarningPopup onClose={closeEarningPopup} />}
    </section>
  );
}
