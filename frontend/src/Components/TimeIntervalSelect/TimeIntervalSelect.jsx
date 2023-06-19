import './TimeIntervalSelect.scss';
import Dropdown from '../Dropdown/Dropdown';
import { timeIntervals } from '../../utils/consts';

export default function TimeIntervalSelect({ selectedTimeInterval, onTimeIntervalChange }) {
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
