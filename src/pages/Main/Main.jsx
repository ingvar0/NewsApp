import styles from './styles.module.css'
import NewsBanner from '../../components/NewsBanner/NewsBanner';
import { useEffect, useState } from 'react';
import { getNews } from '../../api/apiNews';
import { allNews } from '../../api/data'
import NewsList from '../../components/NewsList/NewsList';
import Skeleton from '../../components/Skeleton/Skeleton';

const Main = () => {

  // Работа с серверными данными
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const fetchNews = async () => {
  //     try {
  //       const response = await getNews();
  //       setNews(response.news);
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  //   fetchNews();
  // }, [])

  //Работаем с мок данными, чтобы запросы на сервер не тратить 
  useEffect(() => {
    const fetchNews = () => { 
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(allNews);
        }, 3000);
      });
    };

    const loadNews = async () => {
      setLoading(true);
      const result = await fetchNews();
      console.log(result)
      setNews(result);
      setLoading(false);
    }

    loadNews();
  }, []);

  return (
    <main className={styles.main}>
      {news.length > 0 && !loading ? (<NewsBanner item={news[0]} />) : (<Skeleton type={'banner'} count={1} />)}
      {loading ? (<Skeleton type={'item'} count={10} />) : (<NewsList news={news} />)}
    </main>
  )
}

export default Main;