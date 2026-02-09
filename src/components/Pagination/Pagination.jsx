import styles from './styles.module.css';

const Pagination = ({ totalPages, handleNextPage, handlePreviosPage, handlePageClick, currentPage }) => {
  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePreviosPage} 
        className={styles.arrow}
        disabled={currentPage === 1}
      >{'<'}</button>
      <div className={styles.list}>
        {[...Array(totalPages)].map((_, index) => {
          return (
            <button 
              onClick={() => handlePageClick(index + 1)} 
              disabled={index + 1 === currentPage} 
              className={styles.pageNumber} 
              key={index}
            >
              {index + 1}
            </button>
          )
        })}
      </div>

      <button disabled={currentPage === 10} onClick={handleNextPage} className={styles.arrow}>{'>'}</button>
    </div>
  );
};

export default Pagination;
