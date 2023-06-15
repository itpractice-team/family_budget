import './AccountSelect.scss';
import Button from '../../ui/Button/Button';
import Dropdown from '../Dropdown/Dropdown';

export default function AccountSelect({ handleOptionChange, selectedOption }) {
  const options = ['Тинькофф', 'СБЕР', 'Наличные', 'Другой счёт'];

  return (
    <div className="account-select">
      <p className="account-select__title">Все счета</p>
      <Dropdown
        options={options}
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
