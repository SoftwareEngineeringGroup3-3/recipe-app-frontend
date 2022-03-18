import React from 'react'
import styles from './styles.css'

function Ingredient() {
  return (
    <section className="forms-section">
    <div className="forms">
      <div className="form-wrapper is-active">
        <button type="button" className="switcher switcher-recipes" >
            
          Recipes
          <span className="underline"></span>
        </button>
        <form className="form form-recipe">
          {/* <button type="submit" className="btn-recipes">
              Recipes
            {/* <img src="/public/recipesImage.jpg" alt="recipesImage"/> 
          </button> */}
           <a href="/recipes" className="nav__link">
              Recipes
            </a>
        </form>
      </div>
      <div className="form-wrapper">
        <button type="button" className="switcher switcher-ingredients">
          Ingredients
          <span className="underline"></span>
        </button>
        <form className="form form-ingredients">
         
          <button type="submit" className="btn-ingredients">Continue</button>
        </form>
      </div>
    </div>
  </section>
  )
}

export default Ingredient