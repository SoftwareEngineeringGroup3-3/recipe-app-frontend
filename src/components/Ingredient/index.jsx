import React from 'react'
import styles from './styles.css'

function Ingredient() {
    var recipes = ['Recipe1','Recipe2','Recipe3']
  return (
    <section className="forms-section">
    <div className="forms">
      <div className="form-wrapper is-active">
        <button type="button" className="switcher switcher-recipes" >
            
          Recipes
          <span className="underline"></span>
        </button>
        <form className="form form-recipe">
          

            {
                recipes.map(name => <h2>{name}</h2>)
            }
          <button type="submit" className="btn-recipes">
              Recipes
            {/* <img src="/public/recipesImage.jpg" alt="recipesImage"/> */}
          </button>
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