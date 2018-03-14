// action types
const SET_BOOKS = 'SET_BOOKS'
const INIt_BOOKS = 'INIt_BOOKS'
const INIT_BOOK = 'INIT_BOOK'
const SET_BOOK = 'SET_BOOK'

// reducer
export default function (state, action) {
    if (!state) {
        state = {
            books: {},
            book: {},
        }
    }
    switch (action.type) {
        case 'INIt_BOOKS': 
            return {
                books: action.books           
            }
        case 'INIT_BOOK':
            return {
                book: action.book
            }
        case 'SET_BOOK':
            return {
                book: action.book
            }
        case 'SET_BOOKS':
            return {
                books: action.books
            }
        default:
            return state
    }
}

// action creators
export const initBook = (book) => {
    return { type: INIT_BOOK, book }
}

export const initBooks = (books) => {
    return { type: INIt_BOOKS, books }
}

export const setBooks = (books) => {
    return { type: SET_BOOKS, books}
}

export const setBook = (book) => {
    return { type: SET_BOOK, book }
}