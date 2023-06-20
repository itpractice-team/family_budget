import '../RepeatExpensesPopup.scss';
import { useState } from 'react';
import Radio from '../../../ui/Radio/Radio';
import CustomDatePicker from '../../CustomDatePicker/CustomDatePicker';

export default function DayBtn({ ending = 'ый', period = 'день', inputName }) {
  const [selected, setSelected] = useState('До');
  const [count, setCount] = useState('1');
  const [startDate, setStartDate] = useState(new Date());

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
      <h3 className="repeat-expenses__text-bold">Длительность</h3>
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
              <label
                className="form__input-label form__input-label_colum"
                htmlFor={`${inputName}-date`}
              >
                Дата
                <input
                  className="form__input form__input-small"
                  type="text"
                  name={`${inputName}-date`}
                  id={`${inputName}-date`}
                  value={startDate.toLocaleDateString()}
                />
              </label>
            </div>
            <CustomDatePicker
              type="date"
              onChange={(date) => setStartDate(date)}
              startDate={startDate}
            />
          </>
        )}
      </div>
    </div>
  );
}
