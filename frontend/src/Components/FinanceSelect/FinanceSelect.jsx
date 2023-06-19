import { useSelector } from 'react-redux';
import './FinanceSelect.scss';
import Button from '../../ui/Button/Button';
import Dropdown from '../Dropdown/Dropdown';

export default function FinanceSelect({ handleOptionChange, selectedOption }) {
  const accounts = useSelector((state) => state.userFinance.finance);

  return (
    <div className="finance-select">
      <p className="finance-select__title">Все счета</p>
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
        extraClass="finance-select__button"
      />
    </div>
  );
}
