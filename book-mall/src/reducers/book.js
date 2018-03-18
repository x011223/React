// action types
const INIT_CHAPTERS_LINKS = 'INIT_CHAPTERS_LINKS'

// reducer
const iniState = []
export default function (state = iniState, action) {
    switch (action.type) {
        case 'INIT_CHAPTERS_LINKS':
            // return { 
            //     // chapters_links: action.chapters_links
            //     chapters_links: [...state.chapters_links, action.chapters_links]
            // }
            return action.data
        default:
            return state
    }
}

// action creators
export const initChaptersLinks = (data) => {
    return { type: INIT_CHAPTERS_LINKS, data }
}