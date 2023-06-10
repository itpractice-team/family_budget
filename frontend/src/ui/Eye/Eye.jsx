import React, { useState } from 'react';
import './Eye.scss';

function Eye({ index, setOpenState }) {
  const [isOpened, setOpened] = useState(false);

  const onClick = () => {
    const eyeState = !isOpened;
    setOpened(eyeState);
    setOpenState(index, eyeState);
  };

  return (
    <button
      className={`eye ${isOpened && "opened"}`}
      aria-label="make password visible"
      type="button"
      onClick={onClick}
    />
  );
}

export default Eye;