/* eslint-disable react/no-array-index-key */
import './Tabs.scss';
import Tab from '../Tab/Tab';

export default function Tabs({ arr, size, activeInit, onClick }) {
  const expenseCategories = arr.filter((category) => category.category_type === 1);
  const incomeCategories = arr.filter((category) => category.category_type === 2);

  return (
    <div className="tabs">
      {expenseCategories.map((category, index) => (
        <Tab
          key={index}
          active={activeInit === category.title}
          value={category.title}
          size={size}
          onClick={onClick}
        >
          {category.title}
        </Tab>
      ))}

      {incomeCategories.map((category, index) => (
        <Tab
          key={index}
          active={activeInit === category.title}
          value={category.title}
          size={size}
          onClick={onClick}
        >
          {category.title}
        </Tab>
      ))}

      {arr.map((category, index) => {
        if (category.category_type !== 1 && category.category_type !== 2) {
          return (
            <Tab
              key={index}
              active={activeInit === category.title}
              value={category.title}
              size={size}
              onClick={onClick}
            >
              {category.title}
            </Tab>
          );
        }
        return null;
      })}
    </div>
  );
}
