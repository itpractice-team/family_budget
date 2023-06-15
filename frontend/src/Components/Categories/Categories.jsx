import './Categories.scss';
import { useState } from 'react';
import Tabs from '../Tabs/Tabs';
import Button from '../../ui/Button/Button';
import { arrCategoriesСommon } from '../../utils/consts';

export default function Categories() {
  const [activeDate, setActiveDate] = useState('Общие');

  const handleDateClick = (tab) => {
    setActiveDate(tab);
  };
  return (
    <section className="categories">
      <h2 className="categories__title">Отображать категории</h2>
      <Tabs
        arr={arrCategoriesСommon}
        size="tab-size_m"
        activeInit={activeDate}
        onClick={handleDateClick}
      />
      <Button
        variant="secondary"
        content="text"
        text="Добавить/Редактировать"
        size="medium"
        extraClass="categories-button"
      />
    </section>
  );
}
