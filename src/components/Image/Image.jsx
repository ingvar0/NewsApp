import styles from './styles.module.css'

const Image = ({ image }) => {
  return (
    <div className={styles.wrapper}>
      {image ? <img src={image} alt="new" className={styles.image} /> : null}
    </div>
  )
}

export default Image;