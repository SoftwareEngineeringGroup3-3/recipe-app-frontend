import React from 'react';
import styles from './styles.css'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  var num = 1;
  return (
    <nav className='pagination'>
      
      <i class="arrow left"></i>
        {pageNumbers.map(number => (
          <li key={number} className='page-item' >
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
        <i class="arrow right"></i>
      
    </nav>
  );
};

export default Pagination;