import './CustomDatePicker.scss';
import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);
setDefaultLocale('ru');

export default function CustomDatePicker({
  children,
  type,
  onChange,
  startDate,
  endDate,
  excludeDates,
  selectsRange,
  selectsDisabledDaysInRange,
}) {
  return (
    <>
      <h5 className="data-picker">{children}</h5>
      {type === 'date' && (
        <ReactDatePicker
          startDate={startDate}
          endDate={endDate}
          excludeDates={excludeDates}
          selectsRange={selectsRange}
          selectsDisabledDaysInRange={selectsDisabledDaysInRange}
          selected={startDate}
          onChange={onChange}
          inline
          dateFormat="DD.MM.YYYY"
        />
      )}
      {/* {type === 'time' && (
        <ReactDatePicker
          className="data-picker__time"
          selected={startDate}
          onChange={onChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Время"
          dateFormat="p"
          timeFormat="hh:mm"
        />
      )} */}
    </>
  );
}
