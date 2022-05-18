import React from 'react';
import styles from './styles.css'

const Pagination = ({ postsPerPage, totalPosts, paginate, pagenumber }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='pagination'>
        <a onClick={() => paginate(pagenumber - 1 > 0 ? pagenumber - 1 : 1)}><i className="arrow left" id='decrement' /*onClick={()=>decrementValue()}*/></i></a>
          <li key={pagenumber} className='page-item' >
            <a onClick={() => paginate(pagenumber)} className='page-link'>
              {pagenumber} out of {Math.ceil(totalPosts / postsPerPage)}
            </a>
          </li>
        <a onClick={() => paginate(pagenumber + 1)}><i class="arrow right" id='increment' /*onClick={()=>decrementValue()}*/></i></a>
    </nav>
  );
};

export default Pagination;