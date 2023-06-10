import React from 'react';
import './Speedometer.scss';

export default function Speedometer({ income, spend }) {
  const percentage = (spend / income) * 100;

  let speedometerClass = 'speedometer';

  if (percentage <= 40) {
    speedometerClass += ' speedometer--green';
  } else if (percentage <= 70) {
    speedometerClass += ' speedometer--yellow';
  } else {
    speedometerClass += ' speedometer--red';
  }

  const arrowStyle = {
    transform: `rotate(${percentage * 1.8 - 90}deg)`,
  };

  return (
    <section className="balance">
      <h2 className="balance__title">В этом месяце</h2>
      <div className={speedometerClass}>
        <div className="speedometer__track" />
        <div className="speedometer__arrow" style={arrowStyle} />
        <div className="speedometer__text">
          <p className="speedometer__label">Баланс</p>
          <p className="speedometer__value">{income - spend}₽</p>
        </div>
      </div>
      <div className="spans-block">
        <span className="spans-block__item">Доход {income}₽</span>
        <span className="spans-block__item">Расход {spend}₽</span>
      </div>
    </section>
  );
}
