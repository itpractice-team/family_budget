import React from 'react';
import Switch from './Switch';
import './Switch.scss';

export default {
  title: 'Switch',
  component: Switch,
  argTypes: {
    disabled: {
      type: 'boolean',
      description: 'Вариант активности переключателя',
      defaultValue: false,
      options: [false, true],
      control: {
        type: 'boolean',
      },
    },
  },
};

function Template({ label, onChange, disabled }) {
  return <Switch label={label} onChange={onChange} disabled={disabled} />;
}

export const ToggleText = Template.bind({});
ToggleText.args = {
  label: 'Toggle',
};

export const Toggle = Template.bind({});
Toggle.args = {
  label: '',
};
