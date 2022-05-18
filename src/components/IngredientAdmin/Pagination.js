import React from 'react';
import styles from './styles.css'

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage, pagenumber }) => {
  const pageNumbers = [];
  function incrementValue()
{
    var currentPage = parseInt(document.getElementById('increment').currentPage, 10);
    currentPage = isNaN(currentPage) ? 0 : currentPage;
    currentPage++;
    document.getElementById('increment').currentPage = currentPage;
    paginate(currentPage + 1)
}
function decrementValue()
{
    var currentPage = parseInt(document.getElementById('decrement').currentPage, 10);
    currentPage = isNaN(currentPage) ? 0 : currentPage;
    currentPage--;
    document.getElementById('increment').currentPage = currentPage;
    paginate(currentPage - 1)
}
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  var num = 1;
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