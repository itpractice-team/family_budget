import React from 'react';
import Checkbox from './Checkbox';
import './Checkbox.scss';

import testIcon from '../../Images/envelope-done.svg';


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

function Template({nameProp,
  text,
  icon,
  onChange,
  disabled,
  extraClass }) {
  return (
  
      <Checkbox
        nameProp={nameProp}
        text={text}
        icon={icon}
        onChange={onChange}
        disabled={disabled}
        extraClass={extraClass}
      />
     

  );
}

export const Default = Template.bind({});
Default.args = {
  nameProp: 'сheckbox-group',
  text: 'Checkbox',
  icon: testIcon,
};