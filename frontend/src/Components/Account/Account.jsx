import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Account.scss';
import AccountSelect from '../AccountSelect/AccountSelect';
import Overlay from '../Overlay/Overlay';
import { getAccounts } from '../../store/slices/accounts';

export default function Account() {
  const dispatch = useDispatch();

  const accounts = useSelector((state) => state.accounts.accounts);

  useEffect(() => {
    dispatch(getAccounts());
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
    setSelectedOption((prevSelectedOption) =>
      prevSelectedOption === value ? prevSelectedOption : value,
    );
  };

  const toggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const closeList = () => {
    setIsListOpen(false);
  };

  return (
    <section className="account">
      <h2 className="account__title">{selectedAccount?.balance}</h2>
      <div className="account__selected-content">
        <button
          className={`account__selected ${isListOpen ? 'account__selected--open' : ''}`}
          type="button"
          onClick={toggleList}
        >
          <span className="account__arrow" />
          {selectedAccount && (
            <>
              <img src={selectedAccount.image} alt="Account Icon" className="account__icon" />
              {selectedAccount.name}
            </>
          )}
        </button>
      </div>
      <Overlay isOpen={isListOpen} onClose={closeList}>
        <AccountSelect handleOptionChange={handleOptionChange} selectedOption={selectedOption} />
      </Overlay>
    </section>
  );
}
