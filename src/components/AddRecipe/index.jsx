import React from "react";
import styles from "./styles.css";
import { useContext, useState, useEffect } from "react";
import { apiUrl } from "../../api";
import { useHistory } from "react-router-dom";
import Posts from "../AddRecipe/Posts";
import Pagination from "../IngredientAdmin/Pagination";
import Select from "react-select";
import { Button } from "bootstrap";



function AddRecipe() {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState("");
  const [inst, setInst] = useState("");
  const [tags, setTags] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  //const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const actions = [
    { label: "vegetarian", value: 1 },
    { label: "gluten free", value: 2 },
    { label: "low calorie", value: 3 },
    { label: "no lactose", value: 4 },
  ];
  var ingList = ['ing1', 'ing2', 'ing3', 'ing4'];

  function remove(el) {
    var element = el;
    element.remove();

  }

  useEffect(() => {
    getIngredients()
  }, [])

  function getIngredients() {
    fetch(`${apiUrl}/ingredients/all`, {
      credentials: "include",
      method: "POST",
    }).then((res) => {
      res
        .json()
        .then((data) => {
          if (data.error) {
            setError(data.message);
          } else {
            setIngredients(data);
            setLoading(true);
            setPosts(data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setError("Invalid server response");
        })
        .catch((error) => {
          console.error(error);
          setError("Failed to connect");
        });
    });
  }
  function getRecipe() {
    fetch(`${apiUrl}/recipe`, {
      credentials: "include",
      method: "POST",
    }).then((res) => {
      res
        .json()
        .then((data) => {
          if (data.error) {
            setError(data.message);
          } else {
             setRecipes(data);
          }
        })
        .catch((error) => {
          console.error(error);
          setError("Invalid server response");
        })
        .catch((error) => {
          console.error(error);
          setError("Failed to connect");
        });
    });
  }

  return (
    <form className="rec-add" >
      <table className="styled-table-add-rec">
        <thead>
          <tr>
            <th>Recipe Data</th>
            <th>Available Ingredients</th>
            <th>Stored Ingredients</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <tr>Name</tr>
              <tr>
                <input
                  id="name"
                  type="text"
                  onInput={(ev) => {
                    setName(ev.target.value);
                  }}
                />
              </tr>
              <tr>
                <br />
              </tr>
              <tr>Instructions</tr>
              <tr>
                <input
                  id="instructions"
                  type="text"
                  onInput={(ev) => {
                    setInst(ev.target.value);
                  }}
                />
              </tr>
              <tr>
                <br />
              </tr>
              <tr>Tag</tr>
              <tr>
                <Select options={actions} />
              </tr>
            </td>
            <td>
              <IngredientFormRecipes />
            </td>
            <td>
              {
                ingList.map((element, i) => <tr key={i} id='chosen-ing-list'>

                  <td>{element}</td>
                  <td>
                    <button type="submit" onClick={() => remove(this)}>
                      -
                    </button>
                  </td>


                </tr>)
              }
            </td>
          </tr>
          <tr>
            <td>
              { }
            </td>
            
          <td>
            <button type="submit" className="sumbitRecipeBtn">
              SUBMIT RECIPE
            </button>
          </td>
          <td>{}</td>
          </tr>
          
        </tbody>
      </table>
    </form>
    // <div class="Everything">
    //   <Recipe></Recipe>
    //   <div class="IngBar">

    //     <div id="Title"><h4>List of ingredients:</h4>
    //     {/* {
    //       ing.map(element => <div className="IngElement">
    //         {element.value}
    //         </div>
    //       )} */}
    //     </div>

    //     <input id="Filter" type="text" placeholder='Start writting ingredient'></input>

    //   </div>
    //   <IngForm>
    //   </IngForm>

    // </div>
  );
}

function IngredientFormRecipes() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [totalIngredients, setTotalIngredients] = useState(1);

  useEffect(() => {
    getIngredients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          if (data.ingredients.length > 0) {
            setIngredients(data);
            setLoading(true);
            setTotalIngredients(data.total_ingredients);
            setPosts(data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return (
    <form className='add-rec-admin-form'>
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



export default AddRecipe;
