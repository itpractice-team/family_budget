/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import { useState } from 'react';
import './Statistic.scss';
import CategoryStats from '../../Components/CategoryStats/CategoryStats';

export default function Statistic() {
  // const [selectedTimeInterval, setSelectedTimeInterval] = useState('Неделя');

  // const handleTimeIntervalChange = (value) => {
  //   setSelectedTimeInterval(value);
  // };

  // const getTodayDate = (event) => {
  //   setSelectedTimeInterval(event.target.value);
  // };

  // работа кнопки выпадающего списка и закрытие модалки

  return (
    <section className="statistic">
      <section className="statistic__overview statistic__block">
        <p className="statistic__text">
          Общее состояние по
          {/* adds select */}
        </p>
      </section>

      <section className="statistic__periods statistic__block">
        <div className="statistic__filtration">
          <p>stats filter</p>
          {/* adds */}
        </div>
        <p>stats</p>
      </section>

      <section className="statistic__spending statistic__block">
        <CategoryStats
          header="Расходы по категориям"
          // selectedTimeInterval={selectedTimeInterval}
          // handleTimeIntervalChange={handleTimeIntervalChange}
          // getTodayDate={getTodayDate}
        />
      </section>

      <section className="statistic__incoms statistic__block">
        <CategoryStats
          header="Доходы по категориям"
          // selectedTimeInterval={selectedTimeInterval}
          // handleTimeIntervalChange={handleTimeIntervalChange}
          // getTodayDate={getTodayDate}
        />
      </section>
    </section>
  );
}
