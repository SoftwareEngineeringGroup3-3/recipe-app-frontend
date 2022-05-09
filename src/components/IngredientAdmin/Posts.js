import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { apiUrl } from '../../api';
import editImg from '../../images/edit.png';
import deleteImg from '../../images/delete.png';

const Posts = ({ posts, loading }) => {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getIngredients()
  }, [])

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
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <table className='styled-table'>
      <thead>
        <tr>
          <th className='first-column'>Name</th>
          <th className='second-column'>Quantity</th>
          <th><img src={editImg} className="editImg"/></th>
          <th><img src={deleteImg} className="editImg"/></th>
        </tr>
      </thead>
      <tbody>
        {posts.map((element, i) => <tr key={i} className='ing-cols'>
          <td className='first-column'>{element.name}</td>
          <td className='second-column'>{element.id}</td>
          <td className='user-rows'>
            <button className="EditButton" >
              <a href={"/EditIngredient/?id=" + element.id + "&name=" + element.name} className="EditButton" >
                Edit
              </a>
            </button>
          </td>
          <td className='user-rows'>
            <button className="DeleteButton" id="DeleteButton" type="submit" onClick={() => deleteIngredient(element.id)}> 
            Delete
            </button>
          </td>
        </tr>)}
      </tbody>

    </table>
  );
};

export default Posts;