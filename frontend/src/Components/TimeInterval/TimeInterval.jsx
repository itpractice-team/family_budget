/* eslint-disable no-shadow */
export default function TimeInterval({ selectedTimeInterval }) {
  const formatter = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const getTimeInterval = (selectedTimeInterval) => {
    const today = new Date();

    switch (selectedTimeInterval) {
      case 'today': {
        const formattedToday = formatter.format(today);
        return `Сегодня: ${formattedToday}`;
      }

      case 'week': {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - 6); // 6 дней назад
        const formattedWeekStart = formatter.format(weekStart);
        const formattedWeekEnd = formatter.format(today);
        return `На этой неделе: ${formattedWeekStart} - ${formattedWeekEnd}`;
      }

      case 'month': {
        // месяц назад от текущей даты
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        const formattedMonthAgo = formatter.format(monthAgo);
        const formattedToday = formatter.format(today);
        return `За месяц: ${formattedMonthAgo} - ${formattedToday}`;
      }

      case 'year': {
        // год назад от текущей даты
        const yearAgo = new Date(today);
        yearAgo.setFullYear(today.getFullYear() - 1);
        const formattedYearAgo = formatter.format(yearAgo);
        const formattedTodayForYear = formatter.format(today);
        return `За год: ${formattedYearAgo} - ${formattedTodayForYear}`;
      }

      case 'all':
        return 'Вся история';

      default:
        return 'Выберите период';
    }
  };

  const timeInterval = getTimeInterval(selectedTimeInterval);

  return <span>{timeInterval}</span>;
}
