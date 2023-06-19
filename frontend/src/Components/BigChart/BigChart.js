import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import tempData from './MOCK_DATA.json';
import Charts from './Charts';

function BigChart({ lineChart }) {
  const [amount, setAmount] = useState([]);
  const [income, setIncome] = useState([]);
  const [created, setCreated] = useState([]);
  const [lineData, setLineData] = useState([]);

  const isStartDate = useSelector((state) => state.dates.startDate);
  const isEndDate = useSelector((state) => state.dates.endDate);

  useEffect(() => {
    const filteredData = tempData.filter((item) => {
      const dateSplit = item.created.split('.');
      const itemDate = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
      const startSplit = isStartDate.split('.');
      const startDate = new Date(startSplit[2], startSplit[1] - 1, startSplit[0]);
      const endSplit = isEndDate.split('.');
      const endDate = new Date(endSplit[2], endSplit[1] - 1, endSplit[0]);
      // filter dates
      return itemDate >= startDate && itemDate <= endDate;
    });

    const amountArr = [];
    const incomeArr = [];
    const createdArr = [];
    const lineDataArr = [];

    filteredData.forEach((item) => {
      amountArr.push(item.amount);
      incomeArr.push(item.income);
      createdArr.push(item.created);
      const diff = item.income - item.amount;
      lineDataArr.push(diff);
    });

    setAmount(amountArr);
    setIncome(incomeArr);
    setCreated(createdArr);
    setLineData(lineDataArr);
  }, [isStartDate, isEndDate]);

  return (
    <Charts
      amount={amount}
      income={income}
      created={created}
      lineData={lineData}
      lineChart={lineChart}
    />
  );
}

export default BigChart;
