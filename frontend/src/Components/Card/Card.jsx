import './Card.scss';
import React from 'react';

function SpendingCard({ header, text, bank, amount, categoryImg, bankLogo, spending }) {
  let textStyle = '';
  let mathSign = '';

  if (spending) {
    textStyle = 'card__amount_spending';
    mathSign = '-';
  } else {
    textStyle = 'card__amount_earn';
    mathSign = '+';
  }

  return (
    <li className="card">
      <div className="card__block">
        <img className="card__category" src={categoryImg} alt={text} />
        <p className="card__header">
          {header}
          <span className="card__text">{text}</span>
        </p>
      </div>

      <div className="card__block">
        <img className="card__bank-img" src={bankLogo} alt={bank} />
        <p className="card__text">{bank}</p>
      </div>

      <div className="card__block">
        <p className={`card__amount ${textStyle}`}>
          {mathSign}
          {amount}
        </p>
      </div>

      <div className="card__block card__button-block">
        <button type="button" aria-label="Изменить" className="card__button card__button_edit" />
        <button type="button" aria-label="Удалить" className="card__button card__button_delete" />
        <button type="button" aria-label="Повторить" className="card__button card__button_copy" />
      </div>
    </li>
  );
}

export default React.memo(SpendingCard);
