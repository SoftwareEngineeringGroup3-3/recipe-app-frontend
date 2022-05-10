import React from 'react';
import styles from './styles.css'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination-rec-admin'>
        Pages:
        {pageNumbers.map(number => (
          <li key={number} className='page-item-rec-admin' >
            <a onClick={() => paginate(number)} className='page-link-rec-admin'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;