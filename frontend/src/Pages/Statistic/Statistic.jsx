/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import StatisticDates from '../../Components/StatisticDates/StatisticDates';
import './Statistic.scss';
import collectData from '../../utils/chartSettings/collectData';
import LineCharts from '../../Components/BigChart/Charts';
import RoundCharts from '../../Components/RoundChart/RoundChart';
import CategoryBar from '../../Components/CategoryBar/CategoryBar';

export default function Statistic() {
  const [lineChart, setLineChart] = useState(true);

  const [amount, setAmount] = useState([]);
  const [income, setIncome] = useState([]);
  const [created, setCreated] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [category, setCategory] = useState([]);
  const [uniqueCategorie, setUniqueCategorie] = useState([]);
  const [backColor, setBackColor] = useState([]);
  const [amountTotal, setAmountTotal] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [percentageAmount, setPercentageAmount] = useState([]);
  const [percentageIncome, setPercentageIncome] = useState([]);
  const [chartAIData, setChartAIData] = useState([]);

  const isStartDate = useSelector((state) => state.dates.startDate);
  const isEndDate = useSelector((state) => state.dates.endDate);

  useEffect(() => {
    const {
      amountArr,
      incomeArr,
      createdArr,
      lineDataArr,
      categoryArr,
      uniqueCategories,
      backColors,
      totalAmount,
      totalIncome,
      amountPercentage,
      incomePercentage,
    } = collectData(isStartDate, isEndDate);

    setAmount(amountArr);
    setIncome(incomeArr);
    setCreated(createdArr);
    setLineData(lineDataArr);
    setCategory(categoryArr);
    setUniqueCategorie(uniqueCategories);
    setBackColor(backColors);
    setAmountTotal(totalAmount);
    setIncomeTotal(totalIncome);
    setPercentageAmount(amountPercentage);
    setPercentageIncome(incomePercentage);
  }, [isStartDate, isEndDate]);

  useEffect(() => {
    if (amountTotal && incomeTotal) {
      setChartAIData([amountTotal * -1, incomeTotal]);
    }
  }, [amountTotal, incomeTotal]);
  const dinamicChartShow = (state) => {
    setLineChart(state);
  };

  /// /data for amount/income chart ///////
  const chartAIName = '';
  const chartAIcolors = ['rgba(111, 221, 142, 1)', 'rgba(255, 111, 111, 1)'];

  return (
    <section className="statistic">
      <div className="statistic__block">
        <p className="statistic__text statistic__overview">
          Общее состояние по
          {/* adds select */}
        </p>
        <RoundCharts percentage={chartAIData} backColors={chartAIcolors} chartName={chartAIName} />
      </div>

      <div className="statistic__periods statistic__block">
        <div className="statistic__filtration">
          <StatisticDates dinamicChartShow={dinamicChartShow} />
        </div>
        <LineCharts
          lineChart={lineChart}
          amount={amount}
          income={income}
          created={created}
          lineData={lineData}
          category={category}
        />
      </div>

      <div className="statistic__block statistic__block_round">
        <h2 className="statistic__header">Расходы по категориям</h2>
        <RoundCharts
          // uniqueCategories={uniqueCategorie}
          percentage={percentageAmount}
          backColors={backColor}
          totals={amountTotal}
          chartName="Расход"
        />
        <CategoryBar 
        persent='20'
        categoryName='Category' 
        categoryValue= '2000'
        />
      </div>

      <div className="statistic__block statistic__block_round">
        <h2 className="statistic__header">Доходы по категориям</h2>
        <RoundCharts
          // uniqueCategories={uniqueCategorie}
          percentage={percentageIncome}
          backColors={backColor}
          totals={incomeTotal}
          chartName="Доход"
        />
      </div>
    </section>
  );
}
