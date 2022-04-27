import React from 'react';
import styles from './styles.css'

const Pagination = ({ postsPerPage, totalPosts, paginate, pagenumber }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  var num = 1;
  return (
    <nav className='pagination'>
      
      <a onClick={() => paginate(pagenumber - 1 > 0 ? pagenumber - 1 : 1)}><i class="arrow left"></i></a>
          <li key={pagenumber} className='page-item' >
            <a onClick={() => paginate(pagenumber)} className='page-link'>
              {pagenumber}
            </a>
          </li>
        <a onClick={() => paginate(pagenumber + 1)}><i class="arrow right"></i></a>
      
    </nav>
  );
};

export default Pagination;