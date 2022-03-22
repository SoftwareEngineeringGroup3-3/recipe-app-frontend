import React from 'react';
import styles from './styles.css'
import useEffect from 'react';


function AddIngredient() {
  
  return (
    
      <form className="generalForm">
        <fieldset>
          <legend>Add an ingredient</legend>
          <div className="input-block">
            <label class="label1">Name of ingredient</label>
            <input id="name" type="text"/>
          </div>
          <div className="input-block">
            <label class="label1">Link to a photo</label>
            <input id="confirm-name" type="text" />
          </div>
        </fieldset>
        <button type="submit" id="UpdateButton">Add</button>
        
      </form>
    
      
  )
}

export default AddIngredient