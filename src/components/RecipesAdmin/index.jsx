import React from 'react'
import styles from './styles.css'

function RecipesAdmin() {
  return (
      <div class="All">
        <div class="RecipeBar">
          <div id="Title"><h4>List of recipes:</h4></div>
          <a type="submit" id="AddRecipe" href='/addrecipe'>
              Add recipe
            </a>
            <input id="Filter" type="text" placeholder='Start writting recipe'></input>
          
        </div>
        <RecipeFormAdmin>
        </RecipeFormAdmin>

      </div>

  )
}

function RecipeFormAdmin(){
  var recipes = ['Recipe1','Recipe2','Recipe1','Recipe2','Recipe1','Recipe2','Recipe1','Recipe2']
  

  return(
    <div class="RecipeForm">
    {
      recipes.map(name => <div class="IngredientElement">
          <div class="Name">{name}</div>
          <button class="ViewRecipe" type="submit">View</button>
        </div>)
    }
    </div>

  )
  
}


export default RecipesAdmin