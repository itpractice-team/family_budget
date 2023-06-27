import tempData from './MOCK_DATA.json';

const collectData = (isStartDate, isEndDate) => {
  if (!isEndDate) {
    const day = String(new Date().getDate()).padStart(2, '0');
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const year = new Date().getFullYear();
    isEndDate = `${day}.${month}.${year}`;
  }
  if (!isStartDate) {
    isStartDate = '01.01.1950';
  }
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
  const categoryArr = [];

  filteredData.forEach((item) => {
    amountArr.push(item.amount);
    incomeArr.push(item.income);
    createdArr.push(item.created);
    const diff = item.income - item.amount;
    lineDataArr.push(diff);
    categoryArr.push(item.category);
  });
  return { amountArr, incomeArr, createdArr, lineDataArr, categoryArr };
};
export default collectData;
