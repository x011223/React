const linksReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_CHAPTERS_LINKS':
            return {
                linksReducer: action.linksReducer
            }
        default: 
            return state
    }
}

export default linksReducer