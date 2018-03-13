// action types
const SET_BOOKS = 'SET_BOOKS'
const INIt_BOOKS = 'INIt_BOOKS'
const INIT_BOOK_ID = 'INIT_BOOK_ID'
const INIT_BOOK = 'INIT_BOOK'

// reducer
export default function (state, action) {
    if (!state) {
        state = {
            books: null,
            book: null,
            book_id: null
        }
    }
    switch (action.type) {
        case 'INIt_BOOKS': 
            return {
                books: action.books           
            }
        case 'INIT_BOOK_ID':
            // 初始化  书籍ID
            return { 
                book_id: action.book_id
            }
        case 'INIT_BOOK':
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
export const initBookId = (book_id) => {
    return { type: INIT_BOOK_ID, book_id }
}

export const initBook = (book) => {
    return { type: INIT_BOOK, book }
}

export const initBooks = (books) => {
    return { type: INIt_BOOKS, books }
}

export const setBooks = (books) => {
    return { type: SET_BOOKS, books}
}