import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UserFinance.scss';
import UserFinanceSelect from '../UserFinanceSelect/UserFinanceSelect';
import Overlay from '../Overlay/Overlay';
import { getUserFinance } from '../../store/slices/userFinance';
import usePopup from '../../utils/hooks/usePopup';
import AddFinancePopup from '../AddFinancePopup/AddFinancePopup';

export default function UserFinance() {
  const dispatch = useDispatch();

  const accounts = useSelector((state) => state.userFinance.finance);

  const { isOpen: isAddItemPopupOpen, closePopup: closeAddItemPopup } = usePopup('addItem');

  useEffect(() => {
    dispatch(getUserFinance());
  }, []);

  const [selectedOption, setSelectedOption] = useState('');
  const [isListOpen, setIsListOpen] = useState(false);

  useEffect(() => {
    if (accounts.length > 0) {
      setSelectedOption(accounts[0].id);
    }
  }, [accounts]);

  const selectedAccount = accounts.find((account) => account.id === selectedOption);

  const handleOptionChange = (value) => {
    setSelectedOption((option) => (option === value ? option : value));
  };

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const closeList = () => {
    setIsListOpen(false);
  };

  return (
    <section className="user-finance">
      <h2 className="user-finance__title">{selectedAccount?.balance}</h2>
      <div className="user-finance__selected-content">
        <button
          className={`user-finance__selected ${isListOpen ? 'user-finance__selected--open' : ''}`}
          type="button"
          onClick={toggleList}
        >
          <span className="user-finance__arrow" />
          {selectedAccount && (
            <>
              <img src={selectedAccount.image} className="user-finance__icon" alt="Иконка банка" />
              {selectedAccount.name}
            </>
          )}
        </button>
      </div>
      <Overlay isOpen={isListOpen} onClose={closeList}>
        <UserFinanceSelect
          handleOptionChange={handleOptionChange}
          selectedOption={selectedOption}
          accounts={accounts}
          onCloseList={closeList}
        />
      </Overlay>
      {isAddItemPopupOpen && <AddFinancePopup onClose={closeAddItemPopup} itemType="finance" />}
    </section>
  );
}
