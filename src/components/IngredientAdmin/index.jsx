import React from 'react'
import styles from './styles.css'
import { useContext, useState, useEffect } from 'react';
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';
import Posts from '../IngredientAdmin/Posts';
import Pagination from '../IngredientAdmin/Pagination'

function IngredientAdmin() {
  return (
    <div class="All">
      <div class="IngredientBar">
        <div id="Title"><h4>List of ingredients:</h4></div>
        <input id="Filter" type="text" placeholder='Start writting ingredient'></input>
        <a type="submit" id="AddIngredient" href='/addingredient'>
          Add Ingredient
        </a>
      </div>
      <IngredientForm>
      </IngredientForm>
    </div>

  )
}

function IngredientForm() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

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
          setLoading(true);
          setPosts(data);
          setLoading(false);
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

  

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <form id="IngForm" class="IngredientForm" >
      <table className='ing-disp'>
        {
          <div>
          <Posts posts={currentPosts} loading={loading} />
          <Pagination postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
          // ingredients.map((element, i) => <tr key={i} className='ing-cols'>
          //   <td className='user-rows'>{element.name}</td>
          //   <td className='user-rows'>
          //     <button className="EditButton" type="submit">
          //       <a href={"/EditIngredient/?id=" + element.id + "&name=" + element.name} className="EditButton" >
          //         Edit
          //       </a>
          //     </button>
          //   </td>
          //   <td className='user-rows'>
          //   <button className="DeleteButton" id="DeleteButton" type="submit" onClick={() => deleteIngredient(element.id)}> Delete
          // </button>
          //   </td>
          // </tr>)
        }
      </table>
      {/* {
        ingredients.map((element,i) => <div className="IngredientElement" key={i}>
          
          <div className="IngredientName" >{element.name}

          </div>
          <button className="EditButton" type="submit">
            <a href={"/EditIngredient/?id="+ element.id+"&name="+element.name} className="EditButton" >
              Edit
            </a>
          </button>
          <button className="DeleteButton" id="DeleteButton" type="submit" onClick={() => deleteIngredient(element.id)}> Delete
          </button>
        </div>)
      } */}
    </form>

  );
}

export default IngredientAdmin

