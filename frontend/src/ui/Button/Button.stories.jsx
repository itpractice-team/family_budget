import React from 'react';
import Button from './Button';
import './Button.scss';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    variant: {
      type: 'string',
      description: 'Вариант внешнего вида',
      defaultValue: 'primary',
      options: ['primary', 'secondary', 'fiat'],
      control: {
        type: 'radio',
      },
    },
    content: {
      type: 'string',
      description: 'Вариант наполнения кнопки',
      defaultValue: 'text',
      options: ['text', 'icon-text', 'icon'],
      control: {
        type: 'radio',
      },
    },
    size: {
      type: 'string',
      description: 'Размер кнопки',
      defaultValue: 'small',
      options: ['small', 'medium', 'large'],
      control: {
        type: 'radio',
      },
    },
    type: {
      type: 'string',
      description: 'Вариант типа кнопки',
      defaultValue: 'button',
      options: ['button', 'reset', 'submit'],
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

function Template({ variant, content, text, size, onClick, type, disabled, extraClass }) {
  return (
    <Button
      variant={variant}
      content={content}
      text={text}
      size={size}
      onClick={onClick}
      type={type}
      disabled={disabled}
      extraClass={extraClass}
    />
  );
}

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  content: 'icon-text',
  text: 'Primary button',
  size: 'small',
};
export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  content: 'icon-text',
  text: 'Secondary button',
  size: 'small',
};
export const Fiat = Template.bind({});
Fiat.args = {
  variant: 'fiat',
  content: 'icon-text',
  text: 'Fiat button',
  size: 'small',
};
