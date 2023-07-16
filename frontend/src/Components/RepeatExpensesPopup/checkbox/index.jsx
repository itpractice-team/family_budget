import { useState } from 'react';
import './checkbox.scss';

function Checkbox({ name, children, id, disabled = false, checked = false, ...props }) {
  const [isChecked, setChecked] = useState(checked);
  let classStyle;
  if (props.title) {
    classStyle = isChecked ? 'checkbox_calendar checkbox_calendar__active' : 'checkbox_calendar';
  } else {
    classStyle = isChecked ? 'checkbox checkbox__active' : 'checkbox';
  }
  const handleChange = (e) => {
    setChecked((prev) => !prev);
    props.handleChangeDay(e);
  };

  return (
    <li className={classStyle} key={id}>
      <label className="checkbox_label" id={id} htmlFor={id}>
        <input
          name={name}
          type="checkbox"
          className="checkbox_invisible"
          onChange={handleChange}
          disabled={disabled}
          checked={isChecked}
          {...props}
        />
        {/* <span className="checkbox_visible" /> */}
        {children}
      </label>
    </li>
  );
}

export default Checkbox;
