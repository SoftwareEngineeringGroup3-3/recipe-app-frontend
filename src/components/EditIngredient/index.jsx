import React from 'react';
import styles from './styles.css'
import useEffect from 'react';


function EditIngredient() {
  
  return (
    
      <form className="generalForm">
        <fieldset>
          <legend>Edit an ingredient</legend>
          <div className="input-block">
            <label class="label1">Name of ingredient</label>
            <input id="name" type="text" readonly/>
          </div>
          <div className="input-block">
            <label class="label1">New name</label>
            <input id="confirm-name" type="text" />
          </div>
          <div className="input-block">
            <label class="label1">New link to photo</label>
            <input id="confirm-name" type="text" />
          </div>
        </fieldset>
        <button type="submit" id="UpdateButton">Update</button>
        
      </form>
    
      
  )
}

export default EditIngredient