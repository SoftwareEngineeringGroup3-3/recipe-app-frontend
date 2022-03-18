import React from 'react'
import styles from './styles.css'

function IngrRecSplit() {
  return (
    <div className='split-rec-ing'>
        <div className='left-split'>
            <a href="/recipes" className='ingrRec-split'>
              Recipes
              <img src="../../public/recipesImage" alt="123"></img>
            </a>
        </div>
        <div className='right-split'>
            <a href="/ingredients" className='ingrRec-split'>
              Ingredients
            </a>
        </div>
    </div>
  )
}

export default IngrRecSplit