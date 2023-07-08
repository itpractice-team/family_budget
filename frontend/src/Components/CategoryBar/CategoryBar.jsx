import React from 'react';
import './CategoryBar.scss';

function CategoryBar({ persent, categoryName, categoryValue, color }) {
  const imageUrl = `../../Images/${categoryName}`;
  // style={{border: `7px solid ${color}`}}
  return (
    <div className="category-bar">
      <div
        className="category-bar__circle"
        style={{
          background: `conic-gradient(#EAEBF5 0 ${100 - persent}%, ${color} 0 ${persent}%)`,
        }}
      >
        <div className="category-bar__circle-center" />
        <p className="category-bar__persent">{persent}</p>
      </div>
      <img src={imageUrl} alt={`Иконка ${categoryName}`} className="category-bar__icon" />
      <p className="category-bar__name">{categoryName}</p>
      <p className="category-bar__value">{categoryValue} &#8381;</p>
      <div className="category-bar__arrow" />
    </div>
  );
}

export default CategoryBar;
