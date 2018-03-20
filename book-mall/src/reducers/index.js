import { combineReducers } from 'redux'
import linksReducer from './book'

const chapterLinks = combineReducers({linksReducer})

export default chapterLinks