import './TimeIntervalSelect.scss';
import Dropdown from '../Dropdown/Dropdown';

export default function TimeIntervalSelect({ selectedTimeInterval, onTimeIntervalChange }) {
  const timeIntervals = ['Сегодня', 'Неделя', 'Месяц', 'Год', 'Вся история'];

  return (
    <div className="timeinterval-select">
      <Dropdown
        options={timeIntervals}
        selectedOption={selectedTimeInterval}
        onOptionChange={onTimeIntervalChange}
      />
    </div>
  );
}
