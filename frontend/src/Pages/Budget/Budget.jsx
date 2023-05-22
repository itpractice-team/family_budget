import './Budget.scss';
import Content from '../../Components/Content/Content';
import SpendingPopup from '../../Components/SpendingPopup/SpendingPopup';
import EarningPopup from '../../Components/EarningPopup/EarningPopup';

export default function Budget({
  openSpendingPopup,
  openEarningPopup,
  isSpendingPopupOpen,
  closePopup,
  isEarningPopupOpen,
}) {
  return (
    <Content>
      <section className="budget">
        <p>скоро все увидите</p>

        <div className="budget__button-wrapper">
          <button type="button" className="budget__add-button" onClick={openSpendingPopup}>
            Добавить расход
          </button>

          <button type="button" className="budget__add-button" onClick={openEarningPopup}>
            Добавить доход
          </button>
        </div>

        <SpendingPopup isPopupOpen={isSpendingPopupOpen} closePopup={closePopup} />
        <EarningPopup isPopupOpen={isEarningPopupOpen} closePopup={closePopup} />
      </section>
    </Content>
  );
}
