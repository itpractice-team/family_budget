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

  // Создаем объект для хранения уникальных категорий и их сумм
  const uniqueCategories = {};
  const amountPercentage =[];
  const incomePercentage = [];
  const backColors = [];
  // const borderColors = [];
  let totalAmount=0;
  let totalIncome=0;
  filteredData.forEach((item) => {
    amountArr.push(item.amount);
    incomeArr.push(item.income);
    createdArr.push(item.created);
    const diff = item.income - item.amount;
    lineDataArr.push(diff);
    categoryArr.push(item.category);

    /// ///for round charts////////
    const { amount, income, category } = item;
    if (uniqueCategories[category]) {
      uniqueCategories[category].amount += amount;
      uniqueCategories[category].income += income;
    } else {
      uniqueCategories[category] = { amount, income };
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 125);
      backColors.push(`rgba(${r}, ${g}, ${b}, 1)`);
      // borderColors.push(`rgba(${r}, ${g}, ${b}, 1)`);
    }
    totalAmount += amount;
    totalIncome += income;
  });
  Object.keys(uniqueCategories).forEach((category) => {
    amountPercentage.push(Math.round((uniqueCategories[category].amount / totalAmount) * 100));
      
    incomePercentage.push(Math.round((uniqueCategories[category].income / totalIncome) * 100));
  });
  return {
    amountArr,
    incomeArr,
    createdArr,
    lineDataArr,
    categoryArr,
    uniqueCategories,
    amountPercentage,
    incomePercentage,
    totalAmount,
    totalIncome,
    backColors,
    // borderColors,

  };
};

export default collectData;
