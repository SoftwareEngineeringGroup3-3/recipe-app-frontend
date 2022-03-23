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
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(false);
  let navigate = useHistory();
  var stringTmp = 1;

  function getIngredients() {
    fetch(`${apiUrl}/ingredients`, {
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

  document.addEventListener("DOMContentLoaded", function () {
    getIngredients();
  });
  // document.addEventListener("DOMContentLoaded", function(){
  //   deleteIngredient();
  // });
  // function deleteIngredient(el) {
  //   var ingFormChildren = document.getElementById("IngForm").children;
  //   var isThere = false;
  //   for (let item in ingFormChildren) {
  //     for (let tmp in item.children) {
  //       if(tmp==el){
  //         isThere=true;
  //         break;
  //       }
  //     }
  //     if(isThere==true){
  //       var name = item.firstChild.useContext;
  //       console.log(name);
  //     }
  //   }
  // }


  function deleteIngredient(id) {
    fetch(`${apiUrl}/ingredients/${id}}`, {
      method: 'DELETE'
    }).then(res => {
      res.json().then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          var item = document.getElementById(data);
          item.parentNode.removeChild(item);
          console.log(100);
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



  // document.getElementsByClassName("DeleteButton").addEventListener("click", function () {
  //   deleteIngredient(0);
  // });
  // // var item = document.getElementById(id);

  // // item.parentNode.removeChild(item)
  //  }

  // function EditIngredient(id){
  //   const newState = this.state;
  //   const index = newState.players.findIndex(a => a.id === id);

  //   if (index === -1) return;
  //   newState.players.splice(index, 1);

  //   this.setState(newState);
  // }

  return (
    <div id="IngForm" class="IngredientForm" >
      {
        ingredients.map(element => <div className="IngredientElement" >
          <div className="IngredientName" >{element.name}

          </div>
          <button className="EditButton" type="submit">
            <a href={"/EditIngredient/"} className="EditButton" >
              Edit {element.id}
            </a>
          </button>
          <button className="DeleteButton" onClick={deleteIngredient(element.id)} type="submit" > Delete

          </button>
        </div>)
      }
    </div>

  );
}

export default IngredientAdmin