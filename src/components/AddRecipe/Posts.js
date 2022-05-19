import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { apiUrl } from '../../api';
import editImg from '../../images/edit.png';
import deleteImg from '../../images/delete.png';

const Posts = ({ posts, loading, currentPage, limit, storeIngr }) => {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   getIngredients()
  // }, [])

  function getIngredients() {
    fetch(`${apiUrl}/ingredients/all?page=${currentPage}&limit=${limit}`, {
      credentials: 'include',
      method: 'POST'
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
    <table className='styled-table-ing-rec'>
      <thead>
        <tr>
          <th className='first-column-ing-rec'>Name</th>
          <th className='second-column-ing-rec'>Quantity</th>
          <th className='third-column-ing-rec'>Store</th>
        </tr>
      </thead>
      <tbody>
        {posts?.map((element, i) => <tr key={i} className='ing-cols-ing-rec'>
          <td className='first-column-ing-rec'>{element.name}</td>
          <td className='second-column-ing-rec'>{element.id}</td>
          <td className='third-column-ing-rec'>
            <button onClick={ev => { ev.preventDefault(); storeIngr(element);}}>
              Add to recipe
            </button>
          </td>
        </tr>)}
      </tbody>

    </table>
  );
};

export default Posts;