import React from 'react';
import Radio from './Radio';
import './Radio.scss';

import testIcon from '../../Images/envelope-done.svg';

export default {
  title: 'Radio',
  component: Radio,
  argTypes: {
    disabled: {
      type: 'boolean',
      description: 'Вариант активности кнопки',
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

export const RadioText = Template.bind({});
Default.args = {
  nameProp: 'radio-group',
  text: 'Radio',
};
export const RadioIcon = Template.bind({});
Default.args = {
  nameProp: 'radio-group',
  icon: testIcon,
};
