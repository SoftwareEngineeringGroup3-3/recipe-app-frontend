import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { apiUrl } from '../../api';
import editImg from '../../images/edit.png';
import deleteImg from '../../images/delete.png';
import { List, Datagrid, TextField, DateField, BooleanField } from 'react-admin';

const Posts = ({ posts, loading, currentPage, limit }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   getIngredients()
  // }, [])

  function getUsers() {
    fetch(`${apiUrl}/users/all?page=${currentPage}&limit=${limit}`, {
      credentials: 'include',
      method: 'GET'
    }).then(res => {
      res.json().then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          setUsers(data);
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

  function deleteUsers(id) {
    fetch(`${apiUrl}/users/${id}`, {
      credentials: 'include',
      method: 'DELETE'
    }).then(res => {
      res.json().then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          getUsers();
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
          <th className='second-column'>email</th>
          <th className='second-column'>ID</th>
          <th className='first-column'>Admin</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {posts?.map((element, i) => <tr key={i} className='ing-cols'>
          <td className='first-column'>{element.name}</td>
          <td className='first-column'>{element.email}</td>
          <td className='second-column'>{element.id}</td>
          <td className='second-column'>{element.is_admin}</td>
          <td className='user-rows'>
            <button className="EditButton" >
              <a href={"/EditUser/?id=" + element.id+ "&name=" + element.name} className="EditButton" >
                Edit
              </a>
            </button>
          </td>
          <td className='user-rows'>
            <button className="DeleteButton" id="DeleteButton" type="submit" onClick={() => deleteUsers(element.id)}> 
            Delete
            </button>
          </td>
        </tr>)}
      </tbody>

    </table>
  );
};

export default Posts;