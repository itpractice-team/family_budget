import './UserFinanceSelect.scss';
import Button from '../../ui/Button/Button';
import Dropdown from '../Dropdown/Dropdown';

export default function UserFinanceSelect({ handleOptionChange, selectedOption, accounts }) {
  return (
    <div className="user-finance-select">
      <p className="user-finance-select__title">Все счета</p>
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
        extraClass="user-finance-select__button"
      />
    </div>
  );
}
