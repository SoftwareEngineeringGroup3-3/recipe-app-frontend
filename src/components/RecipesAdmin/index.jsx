import React from 'react'
import styles from './styles.css'
import { useContext, useState } from 'react';
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';

function RecipesAdmin() {
  return (
      <div className="All">
        <div className="RecipeBar">
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
  const [recipes, setRecipes] = useState([]);

  const [error, setError] = useState(false);
  let navigate = useHistory();
  var stringTmp = 1;

  function getRecipes() {
    fetch(`${apiUrl}/recipes`, {
      method: 'GET'
    }).then(res => {
      res.json().then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          setRecipes(data);
          //return data;
        }
      }).catch(error => {
        console.error(error);
        setError('Invalid server response');
      }).catch(error => {
        console.error(error);
        setError('Failed to connect');
      })
    });
  }

  document.addEventListener("DOMContentLoaded", function(){
    getRecipes();
  });
  

  return(
    <div className="RecipeForm">
    {
      recipes.map(name => <div className="IngredientElement">
          <div className="Name">{name}</div>
          <button className="ViewRecipe" type="submit">View</button>
        </div>)
    }
    </div>

  )
  
}


export default RecipesAdmin