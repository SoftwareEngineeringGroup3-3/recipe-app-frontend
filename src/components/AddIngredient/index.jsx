import React from 'react';
import styles from './styles.css'
import useEffect from 'react';
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';


function AddIngredient() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState(false);
  let navigate = useHistory();

  function submitIngredient(ev) {
    ev.preventDefault();
    fetch(`${apiUrl}/ingredients`, {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name })
    }).then(res => {
      res.json().then((data) => {
        if (data.error) {
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

    <form className='ing-add' onSubmit={submitIngredient}>
      <table className='styled-table-add-ing'>
        <thead>
          <tr>
            <th>Add Ingredients</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label className="label1">Name of ingredient</label>
              <tr>
                <input id="name" type="text" onInput={(ev) => { setName(ev.target.value); }}>
                
                </input>
              </tr>
              <label className="label1">Quantity</label>
              <tr>
                <input id="quantity" type="text" onInput={(ev) => { setQuantity(ev.target.value); }}>
                
                </input>
              </tr>
            </td>
          </tr>
          <tr>
            <td>
              <button type="submit" className="ing-add-btn" id="addButtonXD2" >
                Add
              </button>
              {/* <button className="ing-add-btn">
                <a  className="ing-add-btn" type="submit" href="/ingredientsAdmin">
                  Back
                </a>
              </button> */}
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}

export default AddIngredient