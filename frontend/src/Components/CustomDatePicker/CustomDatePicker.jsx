// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import ru from 'date-fns/locale/ru';
import './CustomDatePicker.scss';
import { useState } from 'react';

registerLocale('ru', ru);
setDefaultLocale('ru');

export default function CustomDatePicker({ children, type }) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <h5 className="data-picker">{children}</h5>
      {type === 'date' && (
        <ReactDatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          inline
          shouldCloseOnSelect={false}
        />
      )}
      {type === 'time' && (
        <ReactDatePicker
          className="data-picker__time"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Время"
          dateFormat="p"
          timeFormat="hh:mm"
        />
      )}
    </>
  );
}
