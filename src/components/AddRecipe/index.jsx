import React from 'react'
import styles from './styles.css'

function AddRecipe() {
  return (
      <div class="Everything">
         <Recipe></Recipe>
        <div class="IngBar">
          <div id="Title"><h4>List of ingredients:</h4></div>
          
            <input id="Filter" type="text" placeholder='Start writting ingredient'></input>
          
        </div>
        <IngForm>
        </IngForm>

      </div>

  )
}

function IngForm(){
  var recipes = ['Ingredient1','Ingredient2','Ingredient3','Ingredient2','Ingredient3','Ingredient2','Ingredient3','Ingredient2']
  

  return(
    <div class="IngForm">
    {
      recipes.map(name => <div class="IngElement">
          <div class="Namee">{name}</div>
          <button class="AddToRecipe" type="submit">Add to recipe</button>
          
        </div>)
    }
    </div>

  )
  
}

function Recipe(){
  return(
    <div class="Recipe">Stored ingredients:
    <div class="StoredIng"> Here will be stored</div>
    </div>
  )
}

export default AddRecipe