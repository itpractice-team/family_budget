import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Categories.scss';
import Tabs from '../Tabs/Tabs';
import Button from '../../ui/Button/Button';
import { arrCategoriesСommon } from '../../utils/consts';
import { getCategories } from '../../store/slices/categories';

export default function Categories() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

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
      <p className="categories__all-text">Выбрать все</p>
      <div className="categories__list">
        {categories.map((category) => (
          <article key={category.id} className="categories__item">
            <img src={category.image} alt={category.name} className="categories__item-image" />
            <p className="categories__item-name">{category.name}</p>
          </article>
        ))}
      </div>
      <Button
        variant="secondary"
        content="text"
        text="Добавить/Редактировать"
        size="medium"
        extraClass="categories__button"
      />
    </section>
  );
}
