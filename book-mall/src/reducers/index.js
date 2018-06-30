import { combineReducers } from 'redux'
import linksReducer from './book'
import listReducer from './list'
// const chapterLinks = combineReducers({linksReducer})
const reducers = combineReducers({linksReducer, listReducer})

export default reducers