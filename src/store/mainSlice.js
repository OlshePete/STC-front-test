import { createSlice } from '@reduxjs/toolkit'
import { sortArrayByName } from '../utils/rtkUtils';


const initialState = {
  modeTypes: ['view', 'create' , 'edit' , 'export' , 'import'],
  mode: 'view',
  list: [],
  is_sort_desc: false,
  query: "",
  page: 0,
  offset: 10,
  loading: false,
}

export const mainSlice = createSlice({
  name: 'phoneBook',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload || ""
      state.page = 0
      state.loading = true
    },
    changeSortDirection: (state) => {
      state.is_sort_desc = !state.is_sort_desc
      state.page = 0
      state.loading = true
    },
    setModeType: (state, action) => {
      const new_type = String(action.payload)
      if([...state.modeTypes].indexOf(new_type)>=0) state.mode = new_type
    },
    setPage:(state,action)=> {
      let newPage = 0
      if (action.payload && !Number.isNaN(+action.payload)) { 
        newPage = +action.payload
        state.loading = true
      }
      state.page = newPage
    },
    setLoadingFalse:(state)=>{state.loading=false},
    updateContactList : (state, action) => {
      const {id} = action.payload
      const new_contact = {
        id:state.list.length+1,
        ...action.payload
      }
      if (id) {
        const prev_index = state.list.findIndex(c=>c.id===id)
        state.list[prev_index] = new_contact
      } else {
        state.list.push(new_contact)
      }
      state.page = 0
      state.loading = true
      state.mode = 'view'
    },
    uploadList : (state,action) => {
      const new_list = [...state.list, ...action.payload].map((e,id)=>({...e, id:id+1}))
      state.list = sortArrayByName(new_list, state.is_sort_desc)
      state.page = 0
      state.loading = true
      state.mode = 'view'
    },
  },
})

export const { setQuery, changeSortDirection, setPage, setLoadingFalse, updateContactList, setModeType, uploadList} = mainSlice.actions

export default mainSlice.reducer