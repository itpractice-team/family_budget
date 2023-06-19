import { useState } from 'react';
import BigChart from '../../Components/BigChart/BigChart';
import StatisticDates from '../../Components/StatisticDates/StatisticDates';
import './Statistic.scss';

export default function Statistic() {
  const [lineChart, setLineChart] = useState(true)
  const dinamicChartShow = (state) =>{
    setLineChart(state);
  }
  return (
    <section className="statistic">
      <div className="statistic__overview statistic__block">
        <p className="statistic__text">
          Общее состояние по
          {/* adds select */}
        </p>
      </div>

      <div className="statistic__periods statistic__block">
        <div className="statistic__filtration">
      <StatisticDates 
      dinamicChartShow={dinamicChartShow}
      />
        </div>
          <BigChart
            lineChart={lineChart}
          />
      </div>

      <div className="statistic__spending statistic__block">
        <h2 className="statistic__header">Расходы по категориям</h2>
      </div>

      <div className="statistic__incoms statistic__block">
        <h2 className="statistic__header">Доходы по категориям</h2>
      </div>
    </section>
  );
}
