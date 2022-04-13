import React from 'react'
import styles from './styles.css'
import Posts from '../Ingredient/Posts';
import Pagination from '../Ingredient/Pagination'
import { useContext, useState, useEffect } from 'react';
import { apiUrl } from '../../api';

function Ingredient() {
  return (
      <div className="All">
         <StoredIngredients></StoredIngredients>
        <div className="IngredientBar">
          <div id="Title"><h4>List of ingredients:</h4></div>
          <button className="BarButton" type="submit">Next</button>
          <button className="BarButton" type="submit">Finish</button>
            
          
        </div>
        <IngredientForm>
        </IngredientForm>

      </div>

  )
}

function IngredientForm(){
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);
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
  return(
    <form className="IngredientForm">
    {
      <div>
        <Posts posts={currentPosts} loading={loading} />
       <Pagination postsPerPage={postsPerPage}
         totalPosts={posts.length}
         paginate={paginate}
       /> 
      </div>
    }
    </form>

  )
  
}

function StoredIngredients(){



  return(
    <div className="StoredIngredients" >
      <div id="StoredTitle">Stored Ingredients</div>
      <div className="StoredElement">ingredients</div>
    </div>
  )
}

export default Ingredient