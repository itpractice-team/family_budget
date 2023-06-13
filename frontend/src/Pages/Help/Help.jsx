import React from 'react';
import CardQuestion from '../../Components/CardQuestion/CardQuestion';
import './Help.scss';
import { arrInitFQA } from '../../utils/consts';

export default function Help() {
  return (
    <section className="help">
      <div className="help__container">
        <h3 className="help__title">Часто задаваемые вопросы?</h3>
        <ul>
          {arrInitFQA.map((q) => {
            return <CardQuestion question={q.question} answer={q.answer} key={q.id} />;
          })}
        </ul>
      </div>
      <div className="help__container-left">
        <button type="button" aria-label="вопрос" className="help__question-button" />
        <p className="help__text-small">
          Здесь можно найти ответы, которые помогут пользоваться приложением. Если здесь нет
          подходящего ответа, напишите нам на почту и мы с радостью ответим.
        </p>
      </div>
    </section>
  );
}
