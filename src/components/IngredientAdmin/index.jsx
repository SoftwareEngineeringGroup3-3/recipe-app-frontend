/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styles from './styles.css'
import { useContext, useState, useEffect } from 'react';
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';
import Posts from '../IngredientAdmin/Posts';
import Pagination from '../IngredientAdmin/Pagination'
import AddIngredient from '../AddIngredient'

function IngredientAdmin() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  return (
    <div class="All">
      <div class="IngredientBar">
        <div className='ing-admin-title'><h4>List of ingredients</h4></div>
        <input id="Filter" type="text" placeholder='Start writting ingredient'></input>
        <button  onClick={toggleModal} className="AddIngredientBtn" href='/addingredient' >
          Add Ingredient
        </button>
        {modal && (
        <div className="modal">
          {/* <div onClick={toggleModal} className="overlay"></div> */}
          <div className="modal-content">
          <AddIngredient/>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
            
          </div>
        </div>
      )}
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
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [totalIngredients, setTotalIngredients] = useState(0);

  useEffect(() => {
    getIngredients()
  }, [])

  function getIngredients() {
    fetch(`${apiUrl}/ingredients/all?page=${currentPage}&limit=${postsPerPage}`, {
      credentials: 'include',
      method: 'POST'
    }).then(res => {
      res.json().then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          if(data.ingredients.length > 0){
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

  

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    getIngredients();
  }, [currentPage])

  return (
    <form className='ing-admin-form'>
      <div>
          <Posts posts={posts?.ingredients} loading={loading} currentPage={currentPage} limit={postsPerPage}/>
          <Pagination postsPerPage={postsPerPage}
            totalPosts={totalIngredients}
            paginate={paginate}
            pagenumber={currentPage}
          />
          </div>
    </form>

  );
}

export default IngredientAdmin

