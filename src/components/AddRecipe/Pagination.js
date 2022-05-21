import React from 'react';
import styles from './styles.css'

const Pagination = ({ postsPerPage, totalPosts, paginate, pagenumber }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  function displayTotalPages(){
    if(Math.ceil(totalPosts / postsPerPage) > 0)
      return Math.ceil(totalPosts / postsPerPage);
    else
      return 1;
  }
  return (
    <nav className='pagination-rec'>
        <a onClick={() => paginate(pagenumber - 1 > 0 ? pagenumber - 1 : 1)}><i className="arrow left" id='decrement' /*onClick={()=>decrementValue()}*/></i></a>
          <li key={pagenumber} className='page-item-rec' >
            <a onClick={() => paginate(pagenumber)} className='page-link-rec'>
              {pagenumber} out of {displayTotalPages()}
            </a>
          </li>
        <a onClick={() => paginate(pagenumber + 1)}><i class="arrow right" id='increment' /*onClick={()=>decrementValue()}*/></i></a>
    </nav>
  );
};

export default Pagination;