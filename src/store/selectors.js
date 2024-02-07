import { createSelector } from '@reduxjs/toolkit';
import { sortArrayByName } from '../utils/rtkUtils';

export const selectPhoneBook = (state) => state.phoneBook;

export const selectHasResult = createSelector(
  [selectPhoneBook],
  (phoneBook) => {
    const { list } = phoneBook;
    return list.length>0
  }
)
export const selectPageStatus = createSelector(
  [selectPhoneBook],
  (phoneBook) => {
    const { list, page, offset, loading, query } = phoneBook;
    return {
      page,
      has_next:list.length>page*offset,
      loading,
      query
    }
  }
)
export const selectFilteredAndSortedData = createSelector(
  [selectPhoneBook],
  (phoneBook) => {
    const { list, is_sort_desc, query, page, offset } = phoneBook;
    let filteredAndSortedData = [...list];
    if (query.length>0) {
      filteredAndSortedData = filteredAndSortedData.filter((contact) =>
        Object.values(contact).some(value =>{
          return String(value).toLowerCase().includes(query.toLowerCase().trim())
        })
      );
    }
    filteredAndSortedData = sortArrayByName(filteredAndSortedData, is_sort_desc).slice(0+(page*offset),offset+(page*offset));
    return filteredAndSortedData;
  }
);