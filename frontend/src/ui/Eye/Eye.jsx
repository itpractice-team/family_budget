import React from 'react';

function Eye({ eyeState, handleEye }) {
  return (
    <button
      className={`${eyeState ? 'eye' : 'eye-closed'}`}
      aria-label="password eye"
      type="button"
      onClick={handleEye}
    />
  );
}

export default Eye;
