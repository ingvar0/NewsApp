import styles from './styles.module.css'
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import { useEffect, useState } from 'react';
import { getCategories, getNews } from '../../api/apiNews';
import NewsList from '../../components/NewsList/NewsList';
import Skeleton from '../../components/Skeleton/Skeleton';
import Pagination from '../../components/Pagination/Pagination';
import Categories from '../../components/Categories/Categories';

const Main = () => {

  // Работа с серверными данными
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const totalPages = 10;
  const pageSize = 10;

  const fetchNews = async (currentPage) => {
    try {
      setLoading(true);
      const response = await getNews({
        page_number: currentPage,
        page_size: pageSize,
        category: selectedCategory === 'All' ? null : selectedCategory  
      });
      setNews(response.news);
      setLoading(false);
    } catch (error) {
      console.error(error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(["All", ...response.categories]);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage, selectedCategory])

  useEffect(() => {
    fetchCategories();
  }, [])

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


  return (
    <main className={styles.main}>
      <Categories categories={categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
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