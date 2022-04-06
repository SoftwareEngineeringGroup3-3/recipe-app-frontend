import React from 'react'
import styles from './styles.css'
import useEffect from 'react';




function Ingredient() {
  return (
      <div className="All">
         <StoredIngredients></StoredIngredients>
        <div className="IngredientBar">
          <div id="Title"><h4>List of ingredients:</h4></div>
          <button className="BarButton" type="submit">Next</button>
          <button className="BarButton" type="submit">Finish</button>
            
          
        </div>
        <IngredientForm>
        </IngredientForm>

      </div>

  )
}

function IngredientForm(){
  var recipes = ['Ingredient1','Ingredient2','Ingredient3','Ingredient2','Ingredient3','Ingredient2','Ingredient3','Ingredient2']
  

  return(
    <div className="IngredientForm">
    {
      recipes.map((name,i) => <div className="IngredientElement" key={i}>
          <div className="Name">{name}</div>
          <button className="AddToStoreButton" type="submit">Add to stored</button>
          
        </div>)
    }
    </div>

  )
  
}

function StoredIngredients(){



  return(
    <div className="StoredIngredients" >
      <div id="StoredTitle">Stored Ingredients</div>
      <div className="StoredElement">ingredients</div>
    </div>
  )
}

export default Ingredient