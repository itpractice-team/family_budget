import React from 'react';
import './Loader.scss';

export default function Loader({ extraClass }) {
  return <div className={`loader ${extraClass}`} />;
}
