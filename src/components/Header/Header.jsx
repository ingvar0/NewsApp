import getMeeting from '../helpers/getMeeting.js';
import { formateDate } from '../helpers/formateDate.js';
import styles from './styles.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{getMeeting()}</h1>
      <p className={styles.date}>{formateDate(new Date())}</p>
    </header>
  )
}

export default Header;