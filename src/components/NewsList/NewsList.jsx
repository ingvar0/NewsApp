import formatTimeAgo from '../helpers/formatTimeAgo';
import styles from './styles.module.css'

const NewsList = ({ news }) => {
  return (
    <ul className={styles.list}>
      {news.map(item => {
        return (
          <li key={item.id} className={styles.list_element}>
            <div className={styles.list_image_wrapper}>
              {item.image!=='None' && item.image ? <img className={styles.list_image} src={item?.image} alt="фото новости" /> : null}
            </div>
            <div className={styles.list_text}>
              <h5 className={styles.list_title}>{item.title}</h5>
              <p className={styles.list_desc}>{formatTimeAgo(item.published)} by {item.author}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default NewsList;