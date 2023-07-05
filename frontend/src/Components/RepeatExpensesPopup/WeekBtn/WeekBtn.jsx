import '../RepeatExpensesPopup.scss';
import { useState } from 'react';
import { arrCategoriesWeek } from '../../../utils/consts';
import Tab from '../../Tab/Tab';

export default function WeekBtn() {
  const [active, setActive] = useState('');

  const handleWeekClick = (tab) => {
    setActive(tab);
  };

  return (
    <div className="repeat-expenses__tab">
      {arrCategoriesWeek.map((category) => {
        return (
          <Tab
            key={category.id}
            active={active === category.title}
            value={category.title}
            size="tab-size_xs"
            onClick={handleWeekClick}
          >
            {category.title}
          </Tab>
        );
      })}
    </div>
  );
}
