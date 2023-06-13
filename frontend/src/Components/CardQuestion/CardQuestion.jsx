import { useState } from 'react';
import Button from '../../ui/Button/Button';
import './CardQuestion.scss';

export default function CardQuestion({ question, answer }) {
  const [isActive, setIsActive] = useState(false);

  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  return (
    <li className="card-question">
      <div>
        <p className="card-question__question-text">{question}</p>
        {isActive === true && <p className="card-question__answer-text">{answer}</p>}
      </div>
      <div>
        {isActive === false ? (
          <Button variant="secondary" type="icon" size="medium" onClick={toggleIsActive} />
        ) : (
          <Button variant="secondary" type="iconMinus" size="medium" onClick={toggleIsActive} />
        )}
      </div>
    </li>
  );
}
