// action types
const INIT_RANK_ID = 'INIT_RANK_ID'
const SET_RANK_ID = 'SET_RANK_ID'

// reducer
export default function (state, action) {
    if (!state) {
        state = { 
            rank_id: null
        }
    }
    switch (action.type) {
        case 'INIT_RANK_ID':
            return { 
                rank_id: action.rank_id
            }
        case 'SET_RANK_ID':
            return { 
                rank_id: action.rank_id 
            }
        default:
            return state
    }
}

// action creators
export const initRankId = (rank_id) => {
    return { type: INIT_RANK_ID, rank_id }
}

export const setRankId = (rank_id) => {
    return { type: SET_RANK_ID, rank_id }
}