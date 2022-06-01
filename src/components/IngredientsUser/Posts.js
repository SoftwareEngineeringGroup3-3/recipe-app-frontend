import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { apiUrl } from '../../api';
import editImg from '../../images/edit.png';
import deleteImg from '../../images/delete.png';

const Posts = ({ posts, loading, currentPage, limit }) => {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(false);

  function getIngredients() {
    fetch(`${apiUrl}/ingredients/next?page=${currentPage}&limit=${limit}`, {
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

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <table className='styled-table'>
      <thead>
        <tr>
          <th className='first-column'>Name</th>
        </tr>
      </thead>
      <tbody>
        {posts?.map((element, i) => <tr key={i} className='ing-cols'>
          <td className='first-column'>{element.name}</td>
        </tr>)}
      </tbody>

    </table>
  );
};

export default Posts;