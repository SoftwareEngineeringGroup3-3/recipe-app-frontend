import React from 'react'
import styles from './styles.css'

function Recipes() {
  return (
      <div class="All">
        <div class="RecipeBar">
          <div id="Title"><h4>List of recipes:</h4></div>
          
            <input id="Filter" type="text" placeholder='Start writting recipe'></input>
          
        </div>
        <RecipeForm>
        </RecipeForm>

      </div>

  )
}

function RecipeForm(){
  var recipes = ['Recipe1','Recipe2','Recipe1','Recipe2','Recipe1','Recipe2','Recipe1','Recipe2']
  

  return(
    <div class="IngredientForm">
    {
      recipes.map(name => <div class="IngredientElement">
          <div class="Name">{name}</div>
          <button class="ViewRecipe" type="submit">View</button>
        </div>)
    }
    </div>

  )
  
}


export default Recipes