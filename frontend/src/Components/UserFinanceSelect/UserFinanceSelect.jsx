import './UserFinanceSelect.scss';
import Button from '../../ui/Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import usePopup from '../../utils/hooks/usePopup';

export default function UserFinanceSelect({
  handleOptionChange,
  selectedOption,
  accounts,
  onCloseList,
}) {
  const { openPopup: openAddItemPopup } = usePopup('addItem');

  const handleAddFinanceClick = (evt) => {
    evt.preventDefault();
    openAddItemPopup();
    onCloseList();
  };

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
        onClick={handleAddFinanceClick}
      />
    </div>
  );
}
