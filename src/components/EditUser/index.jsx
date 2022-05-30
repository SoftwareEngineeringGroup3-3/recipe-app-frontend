import React from "react";
import styles from "./styles.css";
import useEffect from "react";
import { useContext, useState } from "react";
import { apiUrl } from "../../api";
import { useHistory } from "react-router-dom";

function EditUser() {
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  let navigate = useHistory();
  const [disabled, setDisabled] = useState(false);
  var stringTmp = 1;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idUser = urlParams.get("id");
  const username = urlParams.get("name");
  var newName = "newName";

  function submitUser() {
    newName = document.getElementById("edit-user-name").value;
    fetch(`${apiUrl}/user`, {
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
    <form className="edit-user-form" onSubmit={setUser}>
      <table className="styled-table-edit-user">
        <thead>
          <tr>
            <th>Edit User</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label className="edit-user-name">Username</label>
              <tr>
                <input
                  type="text"
                  defaultValue={username}
                  disabled={disabled}
                  readOnly={true}
                />
              </tr>
            </td>
          </tr>
          <tr>
            <td>
              <label className="edit-user-name">New username</label>
              <tr>
                <input type="text" id="edit-user-name" />
              </tr>{" "}
            </td>
          </tr>
          {/* <tr>
            <td>
              <label className="edit-email-name">Email</label>
              <tr>
                <input
                  type="text"
                  defaultValue={email_}
                  disabled={disabled}
                  readOnly={true}
                />
              </tr>{" "}
            </td>
          </tr> */}
          {/* <tr>
            <td>
              <label className="edit-email-name">New Email</label>
              <tr>
                <input type="text" id="edit-ing-name" />
              </tr>
            </td>
          </tr> */}
          <tr>
            <td>
              <button
                type="submit"
                className="ing-update-btn"
                onClick={() => submitUser()}
              >
                <a href="/users" className="ing-update-btn">
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

export default EditUser;
