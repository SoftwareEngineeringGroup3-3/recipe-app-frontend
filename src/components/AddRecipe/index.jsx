import React from 'react'
import styles from './styles.css'
import { useContext, useState } from 'react';
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';

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

function IngForm() {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(false);
  let navigate = useHistory();
  var stringTmp = 1;

  function getIngredients() {
    fetch(`${apiUrl}/ingredients`, {
      credentials: 'include',
      method: 'GET'
    }).then(res => {
      res.json().then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          setIngredients(data);
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

  function addRecipe() {
    fetch(`${apiUrl}/recipes`, {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, ingredients: ingredients })
    }).then(res => {
      res.json().then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          setRecipes(data);
          //
        }
      }).catch(error => {
        console.error(error);
        setError('Invalid response');
      }).catch(error => {
        console.error(error);
        setError('Failed to connect');
      })
    });
  }

  // var recipes = ['Ingredient1','Ingredient2','Ingredient3','Ingredient2','Ingredient3','Ingredient2','Ingredient3','Ingredient2']
  document.addEventListener("DOMContentLoaded", function () {
    getIngredients();
  });



  return (
    <div className="IngForm" onSubmit={addRecipe}>
      {
        ingredients.map(element => <div className="IngElement">

          <div className="Namee">{element.name}</div>
          <button className="AddToRecipe" type="submit">Add to recipe</button>

        </div>)
      }
    </div>

  )

}

function Recipe() {
  return (
    <div className="IngShow">
      {
        <div className="Recipe">Stored ingredients:
          <div className="StoredIng"> Here will be stored</div>
        </div>
      }
    </div>

  )
}

export default AddRecipe