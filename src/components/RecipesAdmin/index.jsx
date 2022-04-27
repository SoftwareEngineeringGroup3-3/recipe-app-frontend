import React from 'react'
import styles from './styles.css'
import { useContext, useState, useEffect } from 'react';
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';
import Posts from '../RecipesAdmin/Posts';
import Pagination from '../RecipesAdmin/Pagination'

function RecipesAdmin() {
  return (
    <div >
      <div className="RecipeBar">
        <div className='rec-admin-title'><h4>List of recipes:</h4></div>

        <input id="Filter" type="text" placeholder='Start writting recipe'></input>
        <a type="submit" id="AddRecipe" href='/addrecipe'>
          Add recipe
        </a>
      </div>
      <RecipeFormAdmin>
      </RecipeFormAdmin>

    </div>

  )
}

function RecipeFormAdmin() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    getRecipes()
  }, [])

  function getRecipes() {
    fetch(`${apiUrl}/recipes`, {
      credentials: 'include',
      method: 'GET'
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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <form className="rec-admin-form">
      <div>
        <Posts posts={currentPosts} loading={loading} />
        <Pagination postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
    </form>

  )

}


export default RecipesAdmin