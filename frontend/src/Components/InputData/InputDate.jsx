import { useState } from 'react';
import CustomDatePicker from '../CustomDatePicker/CustomDatePicker';

export default function InputData({ labelTitle, inputName, value }) {
  const [startDate, setStartDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [valueDate, setValueDate] = useState(value);

  const isOpen = () => {
    setValueDate(startDate.toLocaleDateString());
    setOpen(true);
  };

  return (
    <>
      <div className="form__input-block">
        <label className="form__input-label" htmlFor={inputName}>
          {labelTitle}
          <input
            className="form__input form__input_date"
            type="text"
            name={inputName}
            id={inputName}
            value={valueDate}
            onChange={(e) => setValueDate(e.target.value)}
            placeholder="дд.мм.гггг"
            onClick={isOpen}
          />
        </label>
      </div>
      {open && (
        <CustomDatePicker
          type="date"
          onChange={(date) => {
            setStartDate(date);
            setValueDate(date.toLocaleDateString());
            setOpen(false);
          }}
          startDate={startDate}
        />
      )}
    </>
  );
}
