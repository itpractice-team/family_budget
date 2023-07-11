import { useState } from 'react';
import './checkbox.scss';

function Checkbox({ children, id, disabled = false, checked = false, ...props }) {
  const [isChecked, setChecked] = useState(checked);
  const classStyle = isChecked ? 'checkbox_label checkbox_active' : 'checkbox_label';

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={classStyle} id={id}>
      <input
        type="checkbox"
        className="checkbox_invisible"
        onChange={() => setChecked((prev) => !prev)}
        disabled={disabled}
        checked={isChecked}
        {...props}
      />
      {/* <span className="checkbox_visible" /> */}
      {children}
    </label>
  );
}

export default Checkbox;
