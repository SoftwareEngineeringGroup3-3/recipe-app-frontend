import React from 'react';
import styles from './styles.css'

<<<<<<< HEAD
const Pagination = ({ postsPerPage, totalPosts, paginate,currentPage }) => {
=======
const Pagination = ({ postsPerPage, totalPosts, paginate, pagenumber }) => {
>>>>>>> 9a38c7c1e29184f70c5ed19dae4777cb8cd1120a
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
      
<<<<<<< HEAD
      <i className="arrow left" id='decrement' onClick={()=>decrementValue()}></i>
        {pageNumbers.map(number => (
          <li key={number} className='page-item' >
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
        <i className="arrow right" id="increment" onClick={()=>incrementValue()}></i>
=======
      <a onClick={() => paginate(pagenumber - 1 > 0 ? pagenumber - 1 : 1)}><i class="arrow left"></i></a>
          <li key={pagenumber} className='page-item' >
            <a onClick={() => paginate(pagenumber)} className='page-link'>
              {pagenumber}
            </a>
          </li>
        <a onClick={() => paginate(pagenumber + 1)}><i class="arrow right"></i></a>
>>>>>>> 9a38c7c1e29184f70c5ed19dae4777cb8cd1120a
      
    </nav>
  );
};

export default Pagination;