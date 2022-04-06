import React from 'react';
import styles from './styles.css'
import useEffect from 'react';
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';


function AddIngredient() {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  let navigate = useHistory();

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
      <form className="generalForm" onSubmit={submitIngredient}>
        <fieldset>
          <legend>Add an ingredient</legend>
          <div className="input-block">
            <label className="label1">Name of ingredient</label>
            <input id="name" type="text" onInput={(ev) => {setName(ev.target.value);}}/>
          </div>
          {/* <div className="input-block">
            <label class="label1">Link to a photo</label>
            <input id="confirm-name" type="text" />
          </div> */}
        </fieldset>

        
        <button type="submit" id="UpdateButton" >Add
        </button>
        <button id="UpdateButton">
            <a id="link" type="submit" href="/ingredientsAdmin">
          Back
          </a>
        </button>
      </form>
  )
}

export default AddIngredient