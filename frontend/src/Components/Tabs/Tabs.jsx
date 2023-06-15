/* eslint-disable react/no-array-index-key */
import './Tabs.scss';
import Tab from '../Tab/Tab';

export default function Tabs({ arr, size, activeInit, onClick }) {
  return (
    <div className="tabs">
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
