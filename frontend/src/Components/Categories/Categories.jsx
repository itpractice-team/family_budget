/* eslint-disable react/no-array-index-key */
import './Categories.scss';
import Tab from '../Tab/Tab';

export default function Categories({ arr, size, activeInit, onClick }) {
  return (
    <div className="categories-tabs">
      {arr?.map((i, index) => {
        return (
          <Tab
            key={index}
            active={activeInit === i.title}
            value={i.title}
            size={size}
            onClick={onClick}
          >
            {i.title}
          </Tab>
        );
      })}
    </div>
  );
}
