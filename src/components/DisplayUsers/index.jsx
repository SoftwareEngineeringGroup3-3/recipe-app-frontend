import React from 'react'
import styles from './styles.css'
import { useContext, useState } from 'react';
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';
import editImg from '../../images/edit.png';
import deleteImg from '../../images/delete.png';
function DisplayUsers() {

    function deleteUsers(id) {
        fetch(`${apiUrl}/users/${id}`, {
          credentials: 'include',
          method: 'DELETE'
        }).then(res => {
          res.json().then((data) => {
            if (data.error) {
              setError(data.message);
            } else {
              getUsers();
              // alert(id);
              // console.log(id);
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

    var users = ['user1', 'user2'];
    return (
        <form className='user-disp'>
            <table className="styled-table-users" >
            <thead>
                <tr>
                    <th className='edit-first-column'>Name</th>
                    <th>Email</th>
                    <th>ID</th>
                    <th>Admin</th>
                    <th><img src={editImg} className="editImg" /></th>
                    <th><img src={deleteImg} className="editImg" /></th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((element, i) => <tr className='user-rows' key={i}>
                        <td className='user-cols'>{element}</td>
                        <td className='user-cols'>{element}</td>
                        <td className='user-cols'>{element}</td>
                        <td className='user-cols'>{element}</td>
                        <td><button className="user-edit-button">Edit</button></td>
                        <td><button className="user-delete-button" id="DeleteButton" type="submit" onClick={()=> deleteUsers(element.id)}>Delete</button></td>
                    </tr>)
                }
            </tbody>
            </table>
        </form>
    )
}

export default DisplayUsers;