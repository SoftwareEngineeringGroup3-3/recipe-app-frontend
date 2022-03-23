import React from 'react'
import styles from './styles.css'
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';

function IngredientAdmin() {
  return (
<<<<<<< HEAD
    <div>
      <div class="IngredientBar">
        <div id="Title"><h4>List of ingredients:</h4></div>
        <input id="Filter" type="text" placeholder='Start writting ingredient'></input>
        <a type="submit" id="AddIngredient" href='/addingredient'>
          Add Ingredient
        </a>
=======
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

>>>>>>> 37f502024a492eff8774638c0ffb05f041833b78
      </div>
      <IngredientForm>
      </IngredientForm>

    </div>

  )
}

function IngredientForm() {
  
  var recipes = ['Ingredient1', 'Ingredient2', 'Ingredient3', 'Ingredient2', 'Ingredient3', 'Ingredient2', 'Ingredient3', 'Ingredient2']


  return (
    <div class="IngredientForm">
      {
        recipes.map(name => <div class="IngredientElement">
          <div class="IngredientName">
            {name}

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