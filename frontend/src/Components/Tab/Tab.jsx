/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './Tab.scss';

export default function Tab({ active, value, size, onClick, children }) {
  const className = `tab ${size} ${active ? 'tab_type_current' : ''}`;

  const handleClick = () => {
    onClick(value);
  };

  return (
    <div className={className} onClick={handleClick}>
      <span className="text text_type_main-default">{children}</span>
    </div>
  );
}
