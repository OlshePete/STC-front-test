import styles from './styles.module.css';

function SearchBar() {

  return (
    <div  className={styles.container}>
      <input type="text" placeholder="Поиск"  className={styles.searchInput}></input>
    </div>
  )
}

export {SearchBar}