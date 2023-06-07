import React from 'react';
import Radio from './Radio';
import './Radio.scss';

export default {
  title: 'Radio',
  component: Radio,
  argTypes: {
    text: {
      type: 'string',
      description: 'Вариант текста',
      defaultValue: 'Radio',
      options: ['Radio', 'Some extra text'],
      control: {
        type: 'radio',
      },
    },
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

function Template({ text, icon, value, onChange, disabled, extraClass }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <Radio
        text={text}
        icon={icon}
        value={value}
        onChange={onChange}
        disabled={disabled}
        extraClass={extraClass}
      />
      <Radio
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
  text: 'Radio',
};
