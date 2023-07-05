import React from 'react'
import './CategoryBar.scss';

function CategoryBar({persent, categoryName, categoryValue, color}) {
   const imageUrl=`../../Images/${categoryName}`;
  return (
    <div className='category-bar'>
        <div className='category-bar__circle' style={{border: `7px solid ${color}`}}>
            <p className='category-bar__persent'>{persent}</p>
        </div>
        <img src={imageUrl} alt={`Иконка ${categoryName}`} className='category-bar__icon' />
        <p className='category-bar__name'>{categoryName}</p>
        <p className='category-bar__value'>{categoryValue} &#8381;</p>
    </div>
  )
}

export default CategoryBar