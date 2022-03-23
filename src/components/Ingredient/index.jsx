import React from 'react'
import styles from './styles.css'
import useEffect from 'react';




function Ingredient() {
  return (
      <div class="All">
         <StoredIngredients></StoredIngredients>
        <div class="IngredientBar">
          <div id="Title"><h4>List of ingredients:</h4></div>
          <button class="BarButton" type="submit">Next</button>
          <button class="BarButton" type="submit">Finish</button>
            
          
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
          <div class="Name">{name}</div>
          <button class="AddToStoreButton" type="submit">Add to stored</button>
          
        </div>)
    }
    </div>

  )
  
}

function StoredIngredients(){



  return(
    <div class="StoredIngredients" >
      <div id="StoredTitle">Stored Ingredients</div>
      <div class="StoredElement">ingredients</div>
    </div>
  )
}

export default Ingredient