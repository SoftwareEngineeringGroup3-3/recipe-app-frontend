import React from 'react';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
        posts.map((element) =>
          <div className="IngredientElement">
            <div className="IngredientName" >{element.name}
            </div>
            <button className="EditButton" type="submit">
              <a href={"/EditIngredient/"} className="EditButton" >
                Edit {element.id}
              </a>
            </button>
            <button className="DeleteButton" id="DeleteButton" type="submit" onClick={(e) => { this.setIngredientId(element.id) }}> Delete
            </button>
          </div>
        )
  );
};

export default Posts;