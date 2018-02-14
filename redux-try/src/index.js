// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';

// 与StoreChange合并
// const appState = {
//     title: {
//         text: 'React.js 小书',
//         color: 'red',
//     },
//     content: {
//         text: 'React.js 小书内容',
//         color: 'blue'
//     }
// }


function createStore (reducer) {
    let state = null
    const listeners = []
    // 监听数据变化
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        state = storeChange(state, action)
        listeners.forEach((listener) => listener())
    }
    dispatch( { } )
    return { getState, dispatch, subscribe }
}

function storeChange (state, action) {
    if (!state) {
        return {
            title: {
                text: 'React.js 小书',
                color: 'red',
            },
            content: {
                text: 'React.js 小书内容',
                color: 'blue'
            }
        } 
    }
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            return {
                ...state,  
                title: {
                    ...state.title,
                    text: action.text
                }
            }
        case 'UPDATE_TITLE_COLOR':
            return {
                ...state,
                title: {
                    ...state.title,
                    color: action.color
                }
            }
        default:
            return state
    }
}

const store = createStore(appState, storeChange)
let oldState = store.getState()
store.subscribe(() => {
    const newState = store.getState() // 数据可能变化，获取新的 state
    renderApp(oldState, newState) // 把新旧的 state 传进去渲染
    oldState = newState // 渲染完以后，新的 newState 变成了旧的 oldState，等待下一次数据变化重新渲染
})

// let newState = { // 新建一个 newAppState
//     ...appState, // 复制 appState 里面的内容
//     title: { // 用一个新的对象覆盖原来的 title 属性
//         ...appState.title, // 复制原来 title 对象里面的内容
//         text: '《React.js 小书》' // 覆盖 text 属性
//     }
// }

// let newpState_1 = { // 新建一个 newAppState1
//     ...newState, // 复制 newAppState1 里面的内容
//     title: { // 用一个新的对象覆盖原来的 title 属性
//         ...newState.title, // 复制原来 title 对象里面的内容
//         color: "blue" // 覆盖 color 属性
//     }
// }

store.subscribe(() => renderApp(store.getState()))

function renderApp (oldState = { }, newState) {
    if (oldState === newState) {
        return
    }
    renderTitle(oldState.title, newState.title)
    renderContent(oldState.content, newState.content)
}

function renderTitle (oldTitle = { }, newTitle) {
    if (oldTitle === newTitle) {
        return
    }
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = newTitle.text
    titleDOM.style.color = newTitle.color
}

function renderContent (oldContent = { }, newContent) {
    if (oldContent === newContent) {
        return
    }
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = newContent.text
    contentDOM.style.color = newContent.color
}

renderApp(store.getState())

store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'lightblue' }) // 修改标题颜色
// renderApp(store.getState()) // 把新的数据渲染到页面上

// class App extends Component {
//     render () {
//         return (
//             <div>
//                 你好啊，2018
//             </div>
//         )
//     }
// }

// ReactDOM.render(
//     <App />,
//     document.getElementById('root')
// );
