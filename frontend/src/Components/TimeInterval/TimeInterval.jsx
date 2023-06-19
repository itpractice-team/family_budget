import { useDispatch } from "react-redux";
import { setDateStart, setDateEnd } from "../../store/slices/dateSlice";

/* eslint-disable no-shadow */
export default function TimeInterval({ selectedTimeInterval, dateFormatter }) {
  const dispatch = useDispatch();
  const getTimeInterval = (selectedTimeInterval) => {

    const today = new Date();

    if (selectedTimeInterval.match(/\d{2}.\d{2}.\d{4}/gm)) {
      return `За период: ${selectedTimeInterval}`;
    }

    switch (selectedTimeInterval) {
      case 'today': {
        const formattedToday = dateFormatter.format(today);
        dispatch(setDateStart(formattedToday));
        dispatch(setDateEnd(''));
        return `Сегодня: ${formattedToday}`;
      }

      case 'week': {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - 6); // 6 дней назад
        const formattedWeekStart = dateFormatter.format(weekStart);
        const formattedWeekEnd = dateFormatter.format(today);
        dispatch(setDateStart(formattedWeekStart));
        dispatch(setDateEnd(formattedWeekEnd));
        return `На этой неделе: ${formattedWeekStart} - ${formattedWeekEnd}`;
      }

      case 'month': {
        // месяц назад от текущей даты
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        const formattedMonthAgo = dateFormatter.format(monthAgo);
        const formattedToday = dateFormatter.format(today);
        dispatch(setDateStart(formattedMonthAgo));
        dispatch(setDateEnd(formattedToday));
        return `За месяц: ${formattedMonthAgo} - ${formattedToday}`;
      }

      case 'year': {
        // год назад от текущей даты
        const yearAgo = new Date(today);
        yearAgo.setFullYear(today.getFullYear() - 1);
        const formattedYearAgo = dateFormatter.format(yearAgo);
        const formattedTodayForYear = dateFormatter.format(today);
        dispatch(setDateStart(formattedYearAgo));
        dispatch(setDateEnd(formattedTodayForYear));
        return `За год: ${formattedYearAgo} - ${formattedTodayForYear}`;
      }

      case 'all':
      dispatch(setDateStart(''));
      dispatch(setDateEnd(''));
        return 'Вся история';

      default:
        return 'Выберите период';
    }
  };

  const timeInterval = getTimeInterval(selectedTimeInterval);

  return <span>{timeInterval}</span>;
}
