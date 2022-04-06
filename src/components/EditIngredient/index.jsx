import React from 'react';
import styles from './styles.css'
import useEffect from 'react';
import { useContext, useState } from 'react';
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';


function EditIngredient() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientId, setIngredientId] = useState(0);
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  let navigate = useHistory();
  const [disabled, setDisabled] = useState(false);
  var stringTmp = 1;


  // function getIngredient(){

  // }

  function getIngredients() {
    fetch(`${apiUrl}/ingredients`, {
      credentials: 'include',
      method: 'GET',
      
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

  function submitIngredient(ev){
    ev.preventDefault();
    fetch(`${apiUrl}/ingredients`, {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name: name})
    }).then(res => {
      res.json().then((data) => {
        if(data.error) {
          setError(data.message);
        } else {
          window.location.reload();
          this.setName({data});
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

  function changeName(){
    document.getElementById(ingredientId).setAttribute(setIngredients);
  }
  return (
    
      <form className="generalForm" onSubmit={setIngredients} >
        {
          ingredients.map((element,i) => <div className='IngredientElement' key={i}>
          <fieldset>
          <legend>Edit an ingredient</legend>
          <div className="IngredientElement">
            <label className="label1">Name of ingredient</label>
            <input id="name" type="text" defaultValue={element.name} disabled={disabled}/>
          </div>
          <div className="IngredientElement">
            <label className="label1">New name</label>
            <input id="confirm-name" type="text" onInput={(ev) => {setName(element.key);}}/>
          </div>
        </fieldset>
        </div>)
        }
        
        <button type="submit" id="UpdateButton">Update</button>
        
      </form>
    
      
  )
}

export default EditIngredient