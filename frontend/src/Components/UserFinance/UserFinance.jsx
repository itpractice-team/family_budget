import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UserFinance.scss';
import UserFinanceSelect from '../UserFinanceSelect/UserFinanceSelect';
import Overlay from '../Overlay/Overlay';
import { getUserFinance } from '../../store/slices/userFinanceAndCategoriesSlice';
import usePopup from '../../utils/hooks/usePopup';
import AddItemPopup from '../AddItemPopup/AddItemPopup';

export default function UserFinance() {
  const dispatch = useDispatch();

  const userFinance = useSelector((state) => state.userFinanceAndCategories.userFinance);

  const { isOpen: isAddItemPopupOpen, closePopup: closeAddItemPopup } = usePopup('addItem');

  useEffect(() => {
    dispatch(getUserFinance());
  }, []);

  const [selectedOption, setSelectedOption] = useState('');
  const [isListOpen, setIsListOpen] = useState(false);

  useEffect(() => {
    if (userFinance.length > 0) {
      setSelectedOption(userFinance[0].id);
    }
  }, [userFinance]);

  const selectedAccount = userFinance.find((account) => account.id === selectedOption);

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
          accounts={userFinance}
          onCloseList={closeList}
        />
      </Overlay>
      {isAddItemPopupOpen && <AddItemPopup onClose={closeAddItemPopup} itemType="finance" />}
    </section>
  );
}
