/* eslint-disable no-unused-vars */
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import './RoundChart.scss';

function RoundCharts({ uniqueCategories, percentage, backColors, totals, chartName }) {
  Chart.register(ArcElement, Tooltip, Legend);
  const data = {
    datasets: [
      {
        data: percentage,
        backgroundColor: backColors,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    redraw: true,
    cutout: '65%', // размер внутреннего круга
    cutoutPercentage: 90,
    plugins: {
      tooltip: {
        fontSize: 30,
        callbacks: {
          label: percentage.forEach((amount) => {
            return `${amount}`;
          }),
        },
      },
      legend: {
        display: false, // Отключение отображения легенды
      },
      layout: {
        padding: 10, // Отступы вокруг графика
      },
    },
  };

  return (
    <div className="round-chart">
      {percentage.length !== 0 ? (
        <>
          <Doughnut data={data} options={options} />
          {chartName ? (
            <p className="round-chart__title">{`${chartName}: ${totals}`}</p>
          ) : (
            <div className="round-chart__img" />
          )}
        </>
      ) : (
        <h2 className="round-chart__no-data">Нет данных для отображения графика.</h2>
      )}
    </div>
  );
}
export default RoundCharts;
