import linksReducer from "../reducers/book";


export const initLinks = (linksReducer) => {
    return {
        type: 'INIT_CHAPTERS_LINKS',
        linksReducer
    }
}