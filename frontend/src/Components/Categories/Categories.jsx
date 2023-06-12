import './Categories.scss';
import Tab from '../Tab/Tab';

export default function Categories({ arr, size, activeInit, onClick }) {
  return (
    <div className="categories-tabs">
      {arr?.map((i) => {
        return (
          <Tab active={activeInit === i.title} value={i.title} size={size} onClick={onClick}>
            {i.title}
          </Tab>
        );
      })}
    </div>
  );
}
