import React from 'react'
import styles from './styles.css'
import { useContext, useState, useEffect } from 'react';
import { apiUrl } from '../../api';
import { useHistory } from 'react-router-dom';
import Posts from '../DisplayUsers/Posts';
import Pagination from '../DisplayUsers/Pagination'
import { List, Datagrid, TextField, DateField, BooleanField } from 'react-admin';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

function DisplayUsers() {
  const [query, setQuery] = useState("");
  
  return (
    <div>
      <UserForm query={query}>
      </UserForm>
    </div>

  )
}

function UserForm({query}) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if(query != "") {
      getUsers(query)
    } else {
      getUsers();
    }
  }, [query]);

  function getUsers(query) {
    const queryName = query ? `&name=${query}` : '';
    fetch(`${apiUrl}/users/all?page=${currentPage}&limit=${postsPerPage}${queryName}`, {
      credentials: 'include',
      method: 'GET'
    }).then(res => {
      res.json().then((data) => {
        if (data.error) {
          setError(data.message);
        } else {
          if (data.users.length > 0) {
            setUsers(data);
            setLoading(true);
            setPosts(data);
            setTotalUsers(data.total_users)
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
    if(query != "") {
      getUsers(query)
    } else {
      getUsers();
    }
  }, [currentPage])

  return (
    <form>
      <div>
        <Posts posts={posts?.users} loading={loading} currentPage={currentPage} limit={postsPerPage} />
        <Pagination postsPerPage={postsPerPage}
          totalPosts={totalUsers}
          paginate={paginate}
          pagenumber={currentPage}
        />
      </div>
    </form>

  );
}

export default DisplayUsers;

