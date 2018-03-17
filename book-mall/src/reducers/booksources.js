const INIT_BOOK_SOURCES = 'INIT_BOOK_SOURCES'
const SET_BOOK_SOURCES = 'SET_BOOK_SOURCES'
const INIT_BOOK_SOURCE_ID = 'INIT_BOOK_SOURCE_ID'
const SET_BOOK_SOURCE_ID = 'SET_BOOK_SOURCE_ID'
const INIT_CHAPTERS = 'INIT_CHAPTERS'
const SET_CHAPTERS = 'SET_CHAPTERS'

export default function (state, action) {
    if (!state) {
        state = {
            book_sources: []
        }
    }
    switch (action.type) {
        case 'INIT_BOOK_SOURCES':
            // 初始化  书籍ID
            return { 
                book_sources: action.book_sources
            }
        case 'SET_BOOK_SOURCES': 
            return {
                book_sources: action.book_sources
            }
        case 'INIT_BOOK_SOURCE_ID': 
            return {
                book_source_id: action.book_source_id
            }
        case 'SET_BOOK_SOURCE_ID':
            return {
                book_source_id: action.book_source_id
            }
        case 'INIT_CHAPTERS':
            return {
                chapters: action.chapters
            }
        case 'SET_CHAPTERS':
            return {
                chapters: action.chapters
            }
        default:
            return state
    }
}

export const initBookSources = (book_sources) => {
    return { type: INIT_BOOK_SOURCES, book_sources }
}

export const setBookSources = (book_sources) => {
    return { type: SET_BOOK_SOURCES, book_sources }
}

export const initBookSourceId = (book_source_id) => {
    return { type: INIT_BOOK_SOURCE_ID, book_source_id }
}

export const setBookSourceId = (book_source_id) => {
    return { type: SET_BOOK_SOURCE_ID, book_source_id }
}

export const initChapters = (chapters) => {
    return { type: INIT_CHAPTERS, chapters }
}

export const setChapters = (chapters) => {
    return { type: SET_CHAPTERS, chapters }
}