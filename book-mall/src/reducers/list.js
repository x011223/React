const listReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_CHAPTERS_LINKS':
            return {
                listReducer: action.listReducer
            }
        default: 
            return state
    }
}

export default listReducer