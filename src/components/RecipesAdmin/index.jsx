import React from 'react'
import styles from './styles.css'
import { useContext, useState, useEffect } from 'react';
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
  
  useEffect(() => {
    getRecipes()
  }, [])

  function getRecipes() {
    fetch(`${apiUrl}/recipes`, {
      credentials: 'include',
      method: 'GET'
    }).then(res => {
      res.json().then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          setRecipes(data);
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

  function deleteRecipes(id) {
    fetch(`${apiUrl}/recipes/${id}`, {
      credentials: 'include',
      method: 'DELETE'
    }).then(res => {
      res.json().then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          getRecipes();
          alert(id);
          console.log(id);
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
  

  return(
    <div className="RecipeForm">
    {
      recipes.map((element,i) => <div className="IngredientElement" key={i}>
          <div className="Name">{element}</div>
          <button className="EditRecipe" type="submit">View</button>
          <button className="DeleteButton" id="DeleteButton" type="submit" onClick={() => deleteRecipes(element.id)}> Delete
          </button>
        </div>)
    }
    </div>

  )
  
}


export default RecipesAdmin