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
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [totalRecipes, setTotalRecipes] = useState(1);

  useEffect(() => {
    getRecipes()
  }, [])

  function getRecipes() {
    fetch(`${apiUrl}/recipes/all?page=${currentPage}&limit=${postsPerPage}`, {
      credentials: 'include',
      method: 'POST'
    }).then(res => {
      res.json().then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          if(data.recipes.length > 0) {
            setRecipes(data);
            setLoading(true);
            setPosts(data);
            setLoading(false);
            setTotalRecipes(data.total_recipes);
          } else {
            setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
          }
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

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    getRecipes();
  }, [currentPage])

  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <form className="rec-admin-form">
      <div>
        <Posts posts={posts?.recipes} loading={loading} currentPage={currentPage} limit={postsPerPage} />
        <Pagination postsPerPage={postsPerPage}
            totalPosts={totalRecipes}
            paginate={paginate}
            pagenumber={currentPage}
          />
      </div>
    </form>

  )

}


export default RecipesAdmin