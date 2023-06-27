import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Charts from './Charts';
import collectData from '../../utils/chartSettings/collectData';

function BigChart({ lineChart }) {
  const [amount, setAmount] = useState([]);
  const [income, setIncome] = useState([]);
  const [created, setCreated] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [category, setCategory] = useState([]);

  const isStartDate = useSelector((state) => state.dates.startDate);
  const isEndDate = useSelector((state) => state.dates.endDate);

  useEffect(() => {
    const { amountArr, incomeArr, createdArr, lineDataArr, categoryArr } = collectData(
      isStartDate,
      isEndDate,
    );

    setAmount(amountArr);
    setIncome(incomeArr);
    setCreated(createdArr);
    setLineData(lineDataArr);
    setCategory(categoryArr);
  }, [isStartDate, isEndDate]);

  return (
    <Charts
      amount={amount}
      income={income}
      created={created}
      lineData={lineData}
      lineChart={lineChart}
      category={category}
    />
  );
}

export default BigChart;
