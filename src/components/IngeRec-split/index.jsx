import React from 'react'
import styles from './styles.css'
import recipes from '../../images/recImg.jpg'
import ingredients from '../../images/ing.jpeg'

function IngrRecSplit() {
  return (
    <div className='split-rec-ing'>
        <div className='left-split'>
            <a href="/recipes" className='ingrRec-split'>
              <label className='recLeb'>Recipes</label>
              <img src={recipes} alt={recipes} className='img-rec'></img>
            </a>
            
        </div>
        <div className='right-split'>
            <a href="/ingredients" className='ingrRec-split'>
              <label className='recLeb'>Ingredients</label>
              <img src={ingredients} alt={ingredients} className='img-rec'></img>
            </a>
        </div>
    </div>
  )
}

export default IngrRecSplit