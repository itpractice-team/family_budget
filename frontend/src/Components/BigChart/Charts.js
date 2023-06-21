import { Line, Bar } from 'react-chartjs-2';
import 'chartjs-plugin-zoom';
import 'chart.js/auto';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

function Charts({ amount, income, created, lineData, lineChart }) {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  const data = {
    labels: created,
    datasets: [
      {
        data: lineData,
        fill: false,
        borderColor: 'blue',
        tension: 0.6,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }; 
  const differrenceData = {
    labels: created,
    datasets: [
      {
        data: amount,
        fill: false,
        borderColor: 'blue',
        tension: 0.6,
        backgroundColor: 'rgba(255,111,111,0.5)',
      },
      {
        data: income,
        fill: false,
        borderColor: 'red',
        tension: 0.6,
        backgroundColor: 'rgba(111,221,142,0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          mode: 'x',
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const { dataIndex } = context;
            const incomeValue = income[dataIndex];
            const amountValue = amount[dataIndex];
            return `Доход: ${incomeValue}, Расход: ${amountValue}`;
          },
        },
      },
    },
  };

  return lineChart ? (
    <Line data={data} options={options} plugins={['zoom']} />
  ) : (
    <Bar data={differrenceData} options={options} />
  );
}
export default Charts;
