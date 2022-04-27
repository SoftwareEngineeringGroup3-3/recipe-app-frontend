import React from 'react';
import styles from './styles.css'

const Pagination = ({ postsPerPage, totalPosts, paginate,currentPage }) => {
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
      
      <i className="arrow left" id='decrement' onClick={()=>decrementValue()}></i>
        {pageNumbers.map(number => (
          <li key={number} className='page-item' >
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
        <i className="arrow right" id="increment" onClick={()=>incrementValue()}></i>
      
    </nav>
  );
};

export default Pagination;