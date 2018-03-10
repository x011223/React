// action types
const INIT_RANKNAMES = 'INIT_RANKNAMES'
const INIT_RANK_BY_NAME = 'INIT_RANK_BY_NAME'

// reducer
export default function (state, action) {
    if (!state) {
        state = { comments: [] }
    }
    switch (action.type) {
        case INIT_RANKNAMES:
            // 初始化评论
            return { rankNames: action.rankNames }
        case INIT_RANK_BY_NAME:
            // 新增评论
            return { rankByName: action.rankByName }
        default:
            return state
    }
}

// action creators
export const initRankNames = (rankNames) => {
    return { type: INIT_RANKNAMES, rankNames }
}

export const initRankByName = (rankByName) => {
    return { type: INIT_RANK_BY_NAME, rankByName }
}