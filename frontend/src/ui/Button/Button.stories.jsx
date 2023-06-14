import React from 'react';
import Button from './Button';
import './Button.scss';

// import ButtonIcon from '../../Images/icons/btn-primary-icon.svg'
import testIconPrimary from '../../Images/icons/btn-primary-icon.svg';
import testIconSecondary from '../../Images/icons/btn-secondary-icon.svg';
import testIconFiat from '../../Images/icons/btn-fiat-icon.svg';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
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

function Template({ variant, content, text, size, onClick, type, disabled, image, extraClass }) {
  return (
    <Button
      variant={variant}
      content={content}
      text={text}
      size={size}
      onClick={onClick}
      type={type}
      disabled={disabled}
      image={image}
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
  image: testIconPrimary,
};
export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  content: 'icon-text',
  text: 'Secondary button',
  size: 'small',
  image: testIconSecondary,
};
export const Fiat = Template.bind({});
Fiat.args = {
  variant: 'fiat',
  content: 'icon-text',
  text: 'Fiat button',
  size: 'small',
  image: testIconFiat,
};
