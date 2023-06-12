import '../RepeatExpensesPopup.scss';
import { useState } from 'react';
import Categories from '../../Categories/Categories';
import { arrCategoriesWeek } from '../../../utils/consts';

export default function WeekBtn() {
  const [activeWeek, setActiveWeek] = useState('Пн');

  const handleWeekClick = (tab) => {
    setActiveWeek(tab);
  };

  return (
    <div className="repeat-expenses__tab">
      <Categories
        arr={arrCategoriesWeek}
        size="tab-size_xs"
        activeInit={activeWeek}
        onClick={handleWeekClick}
      />
    </div>
  );
}
