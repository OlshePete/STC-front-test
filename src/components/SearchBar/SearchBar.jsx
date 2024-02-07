import { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';
import { useSelector, useDispatch } from "react-redux";
import { setQuery } from '../../store/mainSlice';
import useDebounce from '../../utils/hooks/useDebounce';
function SearchBar() {
  const query = useSelector((state) => state.phoneBook.query)
  const [value, setValue] = useState(query)
  const dispatch = useDispatch()
  const debouncedSearchTerm = useDebounce(value, 500);
  const handleChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
  };
  useEffect(() => {
   if(query !== debouncedSearchTerm) dispatch(setQuery(debouncedSearchTerm))
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setValue(query);
  }, [query]);

  return (
      <input 
        type="text"
        placeholder="Поиск"
        className={styles.searchInput}
        value={value}
        onChange={handleChange}
      />
  )
}

export {SearchBar}