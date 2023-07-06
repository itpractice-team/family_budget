import React from 'react'
import './CategoryBar.scss';

function CategoryBar({persent, categoryName, categoryValue}) {
   const imageUrl=`../../Images/${categoryName}`;
   // style={{border: `7px solid ${color}`}}
  return (
    <div className='category-bar category-bar_position'>
        <div className='category-bar__circle' >
        <div className='category-bar__circle-center' />
            <p className='category-bar__persent'>{persent}</p>
        </div>
        <img src={imageUrl} alt={`Иконка ${categoryName}`} className='category-bar__icon' />
        <p className='category-bar__name'>{categoryName}</p>
        <p className='category-bar__value'>{categoryValue} &#8381;</p>
    </div>
  )
}

export default CategoryBar