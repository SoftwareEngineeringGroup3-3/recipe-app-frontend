import React from 'react'
import styles from './styles.css'
import { useContext, useState, useEffect } from 'react';
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';
import Posts from '../EditIngredient/Posts';

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
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(false);

  useEffect(()=>{
    getIngredients()
  },[])
  
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
  
  function deleteIngredient(id) {
    fetch(`${apiUrl}/ingredients/${id}`, {
      credentials: 'include',
      method: 'DELETE'
    }).then(res => {
      res.json().then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          getIngredients();
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

  

  return (
    <form id="IngForm" class="IngredientForm" >
      {
        ingredients.map((element,i) => <div className="IngredientElement" key={i}>
          <div className="IngredientName" >{element.name}

          </div>
          <button className="EditButton" type="submit">
            <a href={"/EditIngredient/?id="+ element.id+"&name="+element.name} className="EditButton" >
              Edit
            </a>
          </button>
          <button className="DeleteButton" id="DeleteButton" type="submit" onClick={() => deleteIngredient(element.id)}> Delete
          </button>
        </div>)
      }
    </form>

  );
}

export default IngredientAdmin

