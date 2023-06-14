import React, { useState } from 'react';
import Radio from './Radio';
import './Radio.scss';

import testIcon from '../../Images/envelope-done.svg';

export default {
  title: 'Radio',
  component: Radio,
  argTypes: {
    disabled: {
      type: 'boolean',
      description: 'Вариант активности радио инпута',
      defaultValue: false,
      options: [false, true],
      control: {
        type: 'boolean',
      },
    },
    onChange: { action: 'changed' },
  },
};

function Template({ nameProp, text, icon, value, isChecked, onChange, disabled, extraClass }) {
  const [selectedValue, setSelectedValue] = useState(isChecked ? value : '');

  const handleChange = (selected) => {
    if (onChange) {
      onChange(selected);
    }
    setSelectedValue(selected);
  };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <Radio
        nameProp={nameProp}
        text={text}
        icon={icon}
        value={value}
        isChecked={selectedValue === value || (!selectedValue && isChecked)}
        onChange={handleChange}
        disabled={disabled}
        extraClass={extraClass}
      />
      <Radio
        nameProp={nameProp}
        text={text}
        icon={icon}
        value={value}
        isChecked={selectedValue === value || (!selectedValue && isChecked)}
        onChange={handleChange}
        disabled={disabled}
        extraClass={extraClass}
      />
    </div>
  );
}

export const Default = Template.bind({});
Default.args = {
  nameProp: 'radio-group',
  text: 'Radio',
  icon: testIcon,
  isChecked: true,
};

export const RadioText = Template.bind({});
RadioText.args = {
  nameProp: 'radio-group',
  text: 'Radio',
  isChecked: true,
};
export const RadioIcon = Template.bind({});
RadioIcon.args = {
  nameProp: 'radio-group',
  icon: testIcon,
  isChecked: true,
};
