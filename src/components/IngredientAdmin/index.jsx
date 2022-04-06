import React, { useEffect } from 'react'
import styles from './styles.css'
import { useContext, useState } from 'react';
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';
import { func } from 'prop-types';

import ReactDOM from 'react-dom';
import Posts from './Posts';
import Pagination from './Pagination';
import axios from 'axios';

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
  const [ingredientId, setIngredientId] = useState(0);
  const [error, setError] = useState(false);
  let navigate = useHistory();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

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

  function deleteIngredient() {
    fetch(`${apiUrl}/ingredients/${ingredientId}}`, {
      credentials: 'include',
      method: 'DELETE'
    }).then(res => {
      res.json().then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          var item = document.getElementById(data);
          item.parentNode.removeChild(item);
          console.log(100);
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

  document.addEventListener("DOMContentLoaded", function () {
    getIngredients();
    document.getElementById("DeleteButton").addEventListener("click", deleteIngredient())
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <form id="IngForm" class="IngredientForm" onSubmit={deleteIngredient}>
      {
        ingredients.map((element) =>
          <div className="IngredientElement">
            <div className="IngredientName" >{element.name}
            </div>
            <Posts posts={currentPosts} loading={loading}/>
            <Pagination postsPerPage={postsPerPage}
                        totalPosts={posts.length}
                        paginate={paginate}
            />
            <button className="EditButton" type="submit">
              <a href={"/EditIngredient/"} className="EditButton" >
                Edit {element.id}
              </a>
            </button>
            <button className="DeleteButton" id="DeleteButton" type="submit" onClick={(e) => { this.setIngredientId(element.id) }}> Delete
            </button>
          </div>
        )
      }
    </form>
  );
}

export default IngredientAdmin
