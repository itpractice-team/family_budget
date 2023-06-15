/* eslint-disable no-shadow */
export default function TimeInterval({ selectedTimeInterval, dateFormatter }) {
  const getTimeInterval = (selectedTimeInterval) => {
    const today = new Date();

    if (selectedTimeInterval.match(/\d{2}.\d{2}.\d{4}/gm)) {
      return `За период: ${selectedTimeInterval}`;
    }

    switch (selectedTimeInterval) {
      case 'Сегодня': {
        const formattedToday = dateFormatter.format(today);
        return `Сегодня: ${formattedToday}`;
      }

      case 'Неделя': {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - 6); // 6 дней назад
        const formattedWeekStart = dateFormatter.format(weekStart);
        const formattedWeekEnd = dateFormatter.format(today);
        return `На этой неделе: ${formattedWeekStart} - ${formattedWeekEnd}`;
      }

      case 'Месяц': {
        // месяц назад от текущей даты
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        const formattedMonthAgo = dateFormatter.format(monthAgo);
        const formattedToday = dateFormatter.format(today);
        return `За месяц: ${formattedMonthAgo} - ${formattedToday}`;
      }

      case 'Год': {
        // год назад от текущей даты
        const yearAgo = new Date(today);
        yearAgo.setFullYear(today.getFullYear() - 1);
        const formattedYearAgo = dateFormatter.format(yearAgo);
        const formattedTodayForYear = dateFormatter.format(today);
        return `За год: ${formattedYearAgo} - ${formattedTodayForYear}`;
      }

      case 'Вся история':
        return 'Вся история';

      default:
        return 'Выберите период';
    }
  };

  const timeInterval = getTimeInterval(selectedTimeInterval);

  return <span>{timeInterval}</span>;
}
