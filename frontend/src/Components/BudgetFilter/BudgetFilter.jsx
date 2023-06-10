import TimeIntervalSelect from '../TimeIntervalSelect/TimeIntervalSelect';
import TimeInterval from '../TimeInterval/TimeInterval';
import Button from '../../ui/Button/Button';

export default function BudgetFilter({
  isFieldset,
  selectedTimeInterval,
  showSelect,
  showCalendar,
  handleSpendClick,
  handleIncomeClick,
  handleTimeIntervalChange,
}) {
  return (
    <div className="budget__filtration">
      <div className="budget__filtration-wrapper">
        <div className={`budget__select ${isFieldset}`}>
          <button className="budget__select-button" type="button" onClick={showSelect}>
            <TimeInterval selectedTimeInterval={selectedTimeInterval} />
          </button>
          <TimeIntervalSelect
            selectedTimeInterval={selectedTimeInterval}
            onTimeIntervalChange={handleTimeIntervalChange}
          />
        </div>

        <button type="button" className="budget__filtration-button" onClick={showCalendar}>
          По дате
        </button>
      </div>
      <div className="budget__button-wrapper">
        <Button
          variant="secondary"
          type="icon-text"
          text="Расход"
          size="medium"
          extraClass="button__budget"
          onClick={handleSpendClick}
        />
        <Button
          variant="secondary"
          type="icon-text"
          text="Доход"
          size="medium"
          extraClass="button__budget"
          onClick={handleIncomeClick}
        />
      </div>
    </div>
  );
}
