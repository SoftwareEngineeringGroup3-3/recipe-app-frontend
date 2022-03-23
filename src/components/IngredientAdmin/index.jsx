import React from 'react'
import styles from './styles.css'
import { useContext, useState } from 'react';
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';

function IngredientAdmin() {
  return (
    <div class="All">
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

function IngredientForm() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(false);
  let navigate = useHistory();


  function getIngredients() {
    fetch(`${apiUrl}/ingredients`, {
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
    getIngredients();
  });

    return (
      <div class="IngredientForm" >
        {
          recipes.map(element => <div class="IngredientElement">
            <div class="IngredientName">{element.name}

            </div>
            <button href="/EditIngredient" class="EditButton" type="submit"> Edit

            </button>
            <button class="DeleteButton" type="submit"> Delete

            </button>
          </div>)
    }
      </div>

    );
}

export default IngredientAdmin