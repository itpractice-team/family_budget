import './LeftBlock.scss';
import { useState } from 'react';
import Account from '../Account/Account';
import Speedometer from '../Speedometer/Speedometer';
import Categories from '../Categories/Categories';
import Button from '../../ui/Button/Button';
import { arrCategoriesСommon } from '../../utils/consts';

export default function LeftBlock() {
  const [activeDate, setActiveDate] = useState('Общие');

  const handleDateClick = (tab) => {
    setActiveDate(tab);
  };
  return (
    <section className="left-block">
      <Account />
      <Speedometer income={25000} spend={11000} />
      <div className="left-block__categories">
        <h2 className="left-block__categories__title">Отображать категории</h2>
        <Categories
          arr={arrCategoriesСommon}
          size="tab-size_m"
          activeInit={activeDate}
          onClick={handleDateClick}
        />
        <Button
          variant="secondary"
          type="text"
          text="Добавить/Редактировать"
          size="medium"
          extraClass="left-block__categories-button"
        />
      </div>
    </section>
  );
}
