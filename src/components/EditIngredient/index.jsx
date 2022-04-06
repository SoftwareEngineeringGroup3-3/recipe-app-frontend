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


  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idIngredient = urlParams.get('id')
  const nameIngredient = urlParams.get('name')

  function submitIngredient(){
    fetch(`${apiUrl}/ingredients/${idIngredient}`, {
      credentials: 'include',
      method: 'PUT',
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


  return (
    
      <form className="generalForm" onSubmit={setIngredients} >
        {
          
          <fieldset>
          <legend>Edit an ingredient</legend>
          <div className="IngredientElement">
            <label className="label1">Name of ingredient</label>
            <input id="name" type="text" defaultValue={nameIngredient} disabled={disabled}/>
          </div>
          <div className="IngredientElement">
            <label className="label1">New name</label>
            <input id="confirm-name" type="text"/>
          </div>
        </fieldset>
        
        }
        
        <button type="submit" id="UpdateButton" onClick={submitIngredient()} >Update</button>
        
      </form>
    
      
  )
}

export default EditIngredient