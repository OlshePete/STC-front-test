import styles from './AppBar.module.css';
import { SearchBar } from '../SearchBar/SearchBar';
import AppSettingModal from '../Dialogs/AppSettingModal';

function AppBar() {
  return (
    <div className={styles.container}>
      <SearchBar/>
      <AppSettingModal/>
    </div>
  )
}

export default AppBar