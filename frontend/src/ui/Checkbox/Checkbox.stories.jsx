import React from 'react';
import Checkbox from './Checkbox';
import './Checkbox.scss';

export default {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    disabled: {
      type: 'boolean',
      description: 'Вариант активности чекбокса',
      defaultValue: false,
      options: [false, true],
      control: {
        type: 'boolean',
      },
    },
  },
};

function Template({ nameProp, text, icon, value, onChange, disabled, extraClass }) {
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
        onChange={onChange}
        disabled={disabled}
        extraClass={extraClass}
      />
      <Radio
        nameProp={nameProp}
        text={text}
        icon={icon}
        value={value}
        onChange={onChange}
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
};