import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { apiUrl } from '../../api';
import editImg from '../../images/edit.png';
import deleteImg from '../../images/delete.png';

const Posts = ({ posts, loading, currentPage, limit }) => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(false);
    
    // useEffect(() => {
    //   getRecipes()
    // }, [])
  
    function getRecipes() {
      fetch(`${apiUrl}/recipes/all?page=${currentPage}&limit=${limit}`, {
        credentials: 'include',
        method: 'POST'
      }).then(res => {
        res.json().then((data) => {
          if (data.error) {
            setError(data.message);
          } else {
            setRecipes(data);
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
  
    function deleteRecipes(id) {
      fetch(`${apiUrl}/recipes/${id}`, {
        credentials: 'include',
        method: 'DELETE'
      }).then(res => {
        res.json().then((data) => {
          if (data.error) {
            setError(data.message);
          } else {
            getRecipes();
            // alert(id);
            // console.log(id);
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
    //const r =["r1", "r2"];
    return (
      <table className='styled-table-rec'>
        <thead>
          <tr>
            <th className='first-column'>Name</th>
            <th><img src={editImg} className="editImg"/></th>
            <th><img src={deleteImg} className="editImg"/></th>
          </tr>
        </thead>
        <tbody>
          {posts?.map((element, i) => <tr key={i} className='ing-cols'>
            <td className='first-column'>{element.name}</td>
            <td className='user-rows'>
              <button className="EditButton" >
                <a href={"/EditIngredient/?id=" + element.id + "&name=" + element.name} className="EditButton" >
                  Edit
                </a>
              </button>
            </td>
            <td className='user-rows'>
              <button className="DeleteButton" id="DeleteButton" type="submit" onClick={() => deleteRecipes(element.id)}> Delete
              </button>
            </td>
          </tr>)}
        </tbody>
  
      </table>
    );
  };
  
  export default Posts;