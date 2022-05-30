import React from "react";
import styles from "./styles.css";
import useEffect from "react";
import { useContext, useState } from "react";
import { apiUrl } from "../../api";
import { useHistory } from "react-router-dom";

function EditIngredient() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientId, setIngredientId] = useState(0);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  let navigate = useHistory();
  const [disabled, setDisabled] = useState(false);
  var stringTmp = 1;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idIngredient = urlParams.get("id");
  const nameIngredient = urlParams.get("name");
  var newName = "newName";

  function submitIngredient() {
    newName = document.getElementById("edit-ing-name").value;
    fetch(`${apiUrl}/ingredients/${idIngredient}`, {
      credentials: "include",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    }).then((res) => {
      res
        .json()
        .then((data) => {
          if (data.error) {
            setError(data.message);
          } else {
            window.location.reload();
            this.setName({ data });
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
    <form className="edit-ing-form" onSubmit={setIngredients}>
      <table className="styled-table-edit-ing">
        <thead>
          <tr>
            <th>Edit Ingredient</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label className="edit-ing-name">Name of ingredient</label>
              <tr>
                <input
                  type="text"
                  defaultValue={nameIngredient}
                  disabled={disabled}
                  readOnly={true}
                />
              </tr>
            </td>
          </tr>
          <tr>
            <td>
              <label className="edit-ing-name">New name</label>
              <tr>
                <input type="text" id="edit-ing-name" />
              </tr>{" "}
            </td>
          </tr>
          <tr>
            <td>
              <label className="edit-ing-name">Quantity</label>
              <tr>
                <input
                  type="text"
                  defaultValue={idIngredient}
                  disabled={disabled}
                  readOnly={true}
                />
              </tr>{" "}
            </td>
          </tr>
          <tr>
            <td>
              <label className="edit-ing-name">New Quantity</label>
              <tr>
                <input type="text" id="edit-ing-name" />
              </tr>
            </td>
          </tr>
          <tr>
            <td>
              <button
                type="submit"
                className="ing-update-btn"
                onClick={() => submitIngredient()}
              >
                <a href="/ingredientsAdmin" className="ing-update-btn">
                  Update
                </a>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

    </form>
  );
}

export default EditIngredient;
