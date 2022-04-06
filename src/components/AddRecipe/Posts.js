import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';

const Posts = ({ posts, loading }) => {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [recipes, setRecipes] = useState([]);

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

  function addRecipe() {
    fetch(`${apiUrl}/recipes`, {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, ingredients: ingredients })
    }).then(res => {
      res.json().then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          setRecipes(data);
          //
        }
      }).catch(error => {
        console.error(error);
        setError('Invalid response');
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
    <ul className='list-group mb-4'>
      {posts.map((element, i) => <tr key={i} className='ing-cols'>
            <td className='user-rows'>{element.name}</td>
            <td className='user-rows'>
             <button onClick={() => addRecipe() }>
                 Add to recipe
             </button>
            </td>
          </tr>)}
    </ul>
  );
};

export default Posts;