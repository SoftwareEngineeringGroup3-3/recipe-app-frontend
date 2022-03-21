import React from 'react'
import styles from './styles.css'

function IngredientAdmin() {
  return (
      <div>
        <div class="IngredientBar">
          <div id="Title"><h4>List of ingredients:</h4></div>
          <button type="submit" id="AddIngredient">Add Ingredient</button>
        </div>
        <IngredientForm>
        </IngredientForm>
        
      </div>
    
  )
}

function IngredientForm(){
  var recipes = ['Ingredient1','Ingredient2','Ingredient3','Ingredient2','Ingredient3','Ingredient2','Ingredient3','Ingredient2']
  return(
    <div class="IngredientForm">
    {
      recipes.map(name => <div class="IngredientElement">
          <div class="IngredientName">{name}

          </div>
          <button class="EditButton" type="submit"> Edit

          </button>
          <button class="DeleteButton" type="submit"> Delete
            
          </button>
        </div>)
    }
    </div>
    
  )
}

export default IngredientAdmin
