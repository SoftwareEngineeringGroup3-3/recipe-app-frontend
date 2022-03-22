import React from 'react'
import styles from './styles.css'

function IngredientAdmin() {
  return (
      <div>
        <div class="IngredientBar">
          <div id="Title"><h4>List of ingredients:</h4></div>
          <input id="Filter" type="text" placeholder='Start writting ingredient'></input>
          <a type="submit" id="AddIngredient" href='/addingredient'>
              Add Ingredient
            </a>
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
          <button href="/EditIngredient" class="EditButton" type="submit"> Edit
                
          </button>
          <button class="DeleteButton" type="submit"> Delete

          </button>
        </div>)
    }
    </div>

  )
  
}

export default IngredientAdmin