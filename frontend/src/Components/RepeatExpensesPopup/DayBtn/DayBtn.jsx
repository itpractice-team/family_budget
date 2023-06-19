import '../RepeatExpensesPopup.scss';
import { useState } from 'react';
import Radio from '../../../ui/Radio/Radio';
import CustomDatePicker from '../../CustomDatePicker/CustomDatePicker';

export default function DayBtn({ ending = 'ый', period = 'день', inputName }) {
  const [selected, setSelected] = useState('До');
  const [count, setCount] = useState('1');
  const [startDate, setStartDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [valueDate, setValueDate] = useState('');

  const handleCount = ({ target }) => {
    const re = /^[0-9\b]+$/;
    const { value } = target;
    if (value === '' || re.test(value)) {
      setCount(value);
    }
  };

  const handle = ({ target }) => {
    const { value } = target;
    setSelected(value);
  };

  const isOpen = () => {
    setValueDate(startDate.toLocaleDateString());
    setOpen(true);
  };

  return (
    <div>
      <p className="repeat-expenses__text">
        Повторять кажд{ending}
        <input
          className="repeat-expenses__input-count"
          value={count}
          type="text"
          maxLength={2}
          onChange={handleCount}
        />{' '}
        {period}
      </p>
      <p className="repeat-expenses__text-bold">Длительность</p>
      <div className="repeat-expenses__container">
        <Radio
          value="Бесконечно"
          isChecked={selected === 'Бесконечно'}
          onChange={handle}
          text="Бесконечно"
        />
        <Radio
          value="Заданное кол-во раз"
          isChecked={selected === 'Заданное кол-во раз'}
          onChange={handle}
          text={`Заданное количество раз ${count}`}
        />
        <Radio value="До" isChecked={selected === 'До'} onChange={handle} text="До" />
        {selected === 'До' && (
          <>
            <div className="form__input-block">
              <label className="form__input-label" htmlFor={`${inputName}-date`}>
                Дата
                <input
                  className="form__input"
                  type="text"
                  name={`${inputName}-date`}
                  id={`${inputName}-date`}
                  value={valueDate}
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
                  setOpen(false);
                }}
                startDate={startDate}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
