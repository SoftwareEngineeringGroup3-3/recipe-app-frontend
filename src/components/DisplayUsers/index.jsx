import React from 'react'
import styles from './styles.css'
import { useContext, useState } from 'react';
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';
import { email } from 'react-admin';

function DisplayUsers() {
    var users = ['user1', 'user2'];
    var email = ['email1', 'email2'];
    return (
        <form className='user-disp'>

            <table className="users" >
                <tr className='user-rows'>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
                    {
                        users.map((element,i) => <tr className='user-rows' key={i}>
                            <td className='user-cols'>{element}</td>
                            <td className='user-cols'>{element}</td>
                        </tr>)
                    }
                
                </table>
        </form>
    )
}

export default DisplayUsers;