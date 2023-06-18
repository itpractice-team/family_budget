import { useSelector } from 'react-redux';
import './AccountSelect.scss';
import Button from '../../ui/Button/Button';
import Dropdown from '../Dropdown/Dropdown';

export default function AccountSelect({ handleOptionChange, selectedOption }) {
  const accounts = useSelector((state) => state.accounts.accounts);

  return (
    <div className="account-select">
      <p className="account-select__title">Все счета</p>
      <Dropdown
        options={accounts}
        selectedOption={selectedOption}
        onOptionChange={handleOptionChange}
      />
      <Button
        variant="secondary"
        content="text"
        text="Добавить/Редактировать"
        size="medium"
        extraClass="button_account-select"
      />
    </div>
  );
}
