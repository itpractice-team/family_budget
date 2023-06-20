import React, { useState } from 'react';
import './Eye.scss';

function Eye({ index, setOpenState, extraClass }) {
  const [isOpened, setOpened] = useState(false);

  const onClick = () => {
    const eyeState = !isOpened;
    setOpened(eyeState);
    setOpenState(index, eyeState);
  };

  return (
    <button
      className={`eye ${isOpened && 'opened'} ${extraClass}`}
      aria-label="make password visible"
      type="button"
      onClick={onClick}
    />
  );
}

export default Eye;
