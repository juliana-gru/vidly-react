import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({ onClick, itemsCount, pageSize, currentPage }) => {  
  
  const pagesCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pagesCount + 1);  

  return ( itemsCount > 1 &&
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => {
          return <li className={ currentPage === page ? "page-item active" : "page-item" } 
          key={page}
          style={{ cursor: "pointer" }}>
            <a onClick={() => onClick(page)}
            className="page-link">{page}</a>
          </li>
        })}       
      </ul>
    </nav>
   );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onClick:PropTypes.func.isRequired
}
 
export default Pagination;