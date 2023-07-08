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
        <p className="statistic__text statistic__overview">Общее состояние по</p>
        {percentageAmount.length !== 0 ? (
          <RoundCharts
            percentage={chartAIData}
            backColors={chartAIcolors}
            chartName={chartAIName}
          />
        ) : (
          <RoundCharts percentage={[100]} backColors="#EAEBF5" chartName={chartAIName} />
        )}
        <div className="statistic__info-block">
          <p className="statistic__info-label">Доход</p>
          <p className="statistic__info-value">{`+${incomeTotal}`} &#8381;</p>
          <p className="statistic__info-label">Расход</p>
          <p className="statistic__info-value">{`-${amountTotal}`} &#8381;</p>
          <p className="statistic__info-sum">
            {incomeTotal - amountTotal > 0
              ? `+${incomeTotal - amountTotal}`
              : incomeTotal - amountTotal}
          </p>
        </div>
        {incomeTotal - amountTotal >= 0 ? (
          <div className="statistic__information">
            <p className="statistic__inform-text">В категориях всё идёт по плану</p>
          </div>
        ) : (
          <div className="statistic__information statistic__information_fail">
            <p className="statistic__inform-text">Продавай почку!</p>
          </div>
        )}
      </div>
      <div className="statistic__periods">
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
        {percentageAmount.length !== 0 ? (
          <RoundCharts
            percentage={percentageAmount}
            backColors={backColor}
            totals={amountTotal}
            chartName="Расход"
          />
        ) : (
          <RoundCharts percentage={[100]} backColors="#EAEBF5" totals="0" chartName="Расход" />
        )}
        <ul className="statistic__category-ul">
          {Object.keys(uniqueCategorie).map((item, index) => {
            return (
              <li>
                <CategoryBar
                  persent={percentageAmount[index]}
                  categoryName={item}
                  categoryValue={amount[index]}
                  color={backColor[index]}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="statistic__block statistic__block_round">
        <h2 className="statistic__header">Доходы по категориям</h2>

        {percentageIncome.length !== 0 ? (
          <RoundCharts
            percentage={percentageIncome}
            backColors={backColor}
            totals={incomeTotal}
            chartName="Доход"
          />
        ) : (
          <RoundCharts percentage={[100]} backColors="#EAEBF5" totals="0" chartName="Доход" />
        )}
        <ul className="statistic__category-ul">
          {Object.keys(uniqueCategorie).map((item, index) => {
            return (
              <li>
                <CategoryBar
                  persent={percentageIncome[index]}
                  categoryName={item}
                  categoryValue={income[index]}
                  color={backColor[index]}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
