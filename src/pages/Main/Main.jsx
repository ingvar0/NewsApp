import styles from './styles.module.css'
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import { useEffect, useState } from 'react';
import { getNews } from '../../api/apiNews';
import { allNews } from '../../api/data'
import NewsList from '../../components/NewsList/NewsList';
import Skeleton from '../../components/Skeleton/Skeleton';
import Pagination from '../../components/Pagination/Pagination';

const Main = () => {

  // Работа с серверными данными
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const pageSize = 10;

  const fetchNews = async (currentPage) => {
    try {
      setLoading(true);
      const response = await getNews(currentPage, pageSize);
      setNews(response.news);
      setLoading(false);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage])

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }


  const handlePreviosPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handlePageClick = (numberPage) => {
    setCurrentPage(numberPage);
  }

  //Работаем с мок данными, чтобы запросы на сервер не тратить 
  // useEffect(() => {
  //   const fetchNews = () => { 
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve(allNews);
  //       }, 3000);
  //     });
  //   };

  //   const loadNews = async () => {
  //     setLoading(true);
  //     const result = await fetchNews();
  //     console.log(result)
  //     setNews(result);
  //     setLoading(false);
  //   }

  //   loadNews();
  // }, []);

  return (
    <main className={styles.main}>
      {news.length > 0 && !loading ? (
        <NewsBanner item={news[0]} />
        ) : (
        <Skeleton type={'banner'} count={1} />
      )}
      <Pagination 
        totalPages={totalPages} 
        handleNextPage={handleNextPage} 
        handlePreviosPage={handlePreviosPage}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
      />
      {loading ? (
        <Skeleton type={'item'} count={10} />
        ) : (
        <NewsList news={news} />
      )}
      <Pagination 
        totalPages={totalPages} 
        handleNextPage={handleNextPage} 
        handlePreviosPage={handlePreviosPage}
        handlePageClick={handlePageClick}
        currentPage={currentPage}
      />
    </main>
  )
}

export default Main;