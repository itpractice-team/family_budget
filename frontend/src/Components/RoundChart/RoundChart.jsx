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
    cutout: '69%', // размер внутреннего круга
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
  console.log(percentage)

  return (
    <div className={`round-chart ${chartName && "round-chart_down"}`}> 
          <Doughnut data={data} options={options} />
          {chartName ? (
            <p className="round-chart__title">{`${chartName}: ${totals}`}&nbsp;&#8381;</p>
          ) : (
            <div className="round-chart__img" />
          )}
    </div>
  );
}
export default RoundCharts;
