import { useState } from 'react';
import './Categories.scss';
import Tab from '../Tab/Tab';
import Button from '../../ui/Button/Button';

export default function Categories() {
  const [activeTab, setActiveTab] = useState('Общие');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="categories">
      <h2 className="categories__title">Отображать категории</h2>
      <div className="categories__tabs">
        <Tab
          active={activeTab === 'Расходы'}
          value="Расходы"
          size="tab-size_m"
          onClick={handleTabClick}
        >
          Расходы
        </Tab>
        <Tab
          active={activeTab === 'Доходы'}
          value="Доходы"
          size="tab-size_m"
          onClick={handleTabClick}
        >
          Доходы
        </Tab>
        <Tab
          active={activeTab === 'Общие'}
          value="Общие"
          size="tab-size_m"
          onClick={handleTabClick}
        >
          Общие
        </Tab>
      </div>
      <Button
        variant="secondary"
        type="text"
        text="Добавить/Редактировать"
        size="medium"
        extraClass="categories__button"
      />
    </section>
  );
}
