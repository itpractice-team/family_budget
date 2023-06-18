import { useState } from 'react';
import Button from '../../ui/Button/Button';
import './CardQuestion.scss';
import plus from '../../Images/icons/plus.svg';
import minus from '../../Images/icons/minus.svg';

export default function CardQuestion({ question, answer }) {
  const [isActive, setIsActive] = useState(false);

  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  return (
    <li className="card-question">
      <div className="card-question__title">
        <p className="card-question__question-text">{question}</p>

        {isActive === false ? (
          <Button
            variant="secondary"
            content="icon"
            image={plus}
            size="small"
            onClick={toggleIsActive}
          />
        ) : (
          <Button
            variant="secondary"
            content="icon"
            image={minus}
            size="small"
            onClick={toggleIsActive}
          />
        )}
      </div>
      {isActive === true && <p className="card-question__answer-text">{answer}</p>}
    </li>
  );
}
