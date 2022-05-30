import React from 'react'
import styles from './styles.css'
import { useContext, useState, useEffect } from 'react';
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';
import Posts from '../IngredientsUser/Posts';
import Pagination from '../IngredientsUser/Pagination'
import AddIngredient from '../AddIngredient'

function IngredientsUser() {
  const [query, setQuery] = useState("");
 
  return (
    <div>
      <div>
        <div><h4>List of ingredients</h4></div>
        <input  type="text" placeholder='Start writting recipe' onInput={ev => 
        { 
          ev.preventDefault();
          setQuery(ev.target.value); 
        }}></input>
      
      </div>
      <IngredientFormUser query={query}/>
    </div>

  )
}

function IngredientFormUser({query}) {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [totalIngredients, setTotalIngredients] = useState(0);

  useEffect(() => {
    getIngredients()
  }, [])

  useEffect(() => {
    if(query != "") {
      getIngredients(query)
    } else {
      getIngredients();
    }
  }, [query]);

  function getIngredients(query) {
    const queryName = query ? `&name=${query}` : '';
    fetch(`${apiUrl}/ingredients/all?page=${currentPage}&limit=${postsPerPage}${queryName}`, {
      credentials: 'include',
      method: 'POST'
    }).then(res => {
      res.json().then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          if (data.ingredients.length > 0) {
            setIngredients(data);
            setLoading(true);
            setPosts(data);
            setTotalIngredients(data.total_ingredients)
            setLoading(false);
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

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    getIngredients();
  }, [currentPage])

  return (
    <form>
      <div>
        <Posts posts={posts?.ingredients} loading={loading} currentPage={currentPage} limit={postsPerPage} />
        <Pagination postsPerPage={postsPerPage}
          totalPosts={totalIngredients}
          paginate={paginate}
          pagenumber={currentPage}
        />
      </div>
    </form>

  );
}

export default IngredientsUser

