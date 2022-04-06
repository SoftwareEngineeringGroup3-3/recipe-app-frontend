import React from 'react'
import styles from './styles.css'
import { useContext, useState,useEffect } from 'react';
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';
import Posts from '../AddRecipe/Posts';
import Pagination from '../IngredientAdmin/Pagination';


var ing = ['a','b'];

function AddRecipe() {
  return (
    <div class="Everything">
      <Recipe></Recipe>
      <div class="IngBar">
        <div id="Title"><h4>List of ingredients:</h4>
        {/* {
          ing.map(element => <div className="IngElement">
            {element.value}
            </div>
          )} */}
        </div>
        
        <input id="Filter" type="text" placeholder='Start writting ingredient'></input>

      </div>
      <IngForm>
      </IngForm>

    </div>

  )
}

function IngForm() {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState([]);
  const [recipes , setRecipes] = useState([]);
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

  

  function addRecipe() {
    fetch(`${apiUrl}/recipes`, {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, ingredients: ingredients })
    }).then(res => {
      res.json().then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          setRecipes(data);
          //
        }
      }).catch(error => {
        console.error(error);
        setError('Invalid response');
      }).catch(error => {
        console.error(error);
        setError('Failed to connect');
      })
    });
  }

  // var recipes = ['Ingredient1','Ingredient2','Ingredient3','Ingredient2','Ingredient3','Ingredient2','Ingredient3','Ingredient2']
  

  function pushRules(list){
    
    var w1 = document.getElementById("Namee");
    console.log(ingredients.id);
    var w = w1.innerHTML;
    var li = document.createElement("li");

    var rule = document.createTextNode(w);
    li.appendChild(rule);
    console.log(rule)
    
  }

  return (
    <div className="IngForm" onSubmit={addRecipe}>
       {
          <div>
          <Posts posts={currentPosts} loading={loading} />
          <Pagination postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
          </div>}
    </div>

  )

}

function Recipe() {
  
  return (
    <div className="IngShow">
      {
        <div className="Recipe">Stored ingredients:
        {
          ing.map((element,i) => <div className="IngElement" id="tempList" key={i}>
            {element}
            </div>
          )}
          {/* <div className="StoredIng"> Here will be stored</div> */}
        </div>
      }
    </div>

  )
}

export default AddRecipe