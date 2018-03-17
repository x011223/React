// action types
const INIT_BOOK_ID = 'INIT_BOOK_ID'
const SET_BOOK_ID = 'SET_BOOK_ID'
const INIT_SHELF_BOOKS = 'INIT_SHELF_BOOKS'
const ADD_SHELF_BOOK = 'ADD_SHELF_BOOK'
const DELETE_SHELF_BOOK = 'DELETE_SHELF_BOOK'

// reducer
export default function (state, action) {
    if (!state) {
        state = {
            book_id: null,
            shelfBooks: []
        }
    }
    switch (action.type) {
        case 'INIT_BOOK_ID':
            // 初始化  书籍ID
            return { 
                book_id: action.book_id
            }
        case 'SET_BOOK_ID': 
            return {
                book_id: [ ...state.book_id, action.book_id ]
            }
        case 'INIT_SHELF_BOOKS': 
            return {
                shelfBooks: action.shelfBooks
            }
        case 'ADD_SHELF_BOOK': 
            return {
                shelfBooks: [...state.shelfBooks, action.shelfBooks]
            }
        case 'DELETE_SHELF_BOOK': 
            return {
                shelfBooks: [
                    ...state.shelfBooks.slice(0, action.shelfBookId),
                    ...state.shelfBooks.slice(action.shelfBookId + 1)
                ]
            }
        default:
            return state
    }
}

// action creators
export const initBookId = (book_id) => {
    return { type: INIT_BOOK_ID, book_id }
}

export const setBookId = (book_id) => {
    return { type: SET_BOOK_ID, book_id }
}

export const initShelfBooks = (shelfBooks) => {
    return { type: INIT_SHELF_BOOKS, shelfBooks }
}

export const addShelfBook = (shelfBooks) => {
    return { type: ADD_SHELF_BOOK, shelfBooks }
}

export const deleteShelfBook = (shelfBookId) => {
    return { type: DELETE_SHELF_BOOK, shelfBookId }
}