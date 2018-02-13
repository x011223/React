// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';

const appState = {
    title: {
        text: 'React.js 小书',
        color: 'red',
    },
    content: {
        text: 'React.js 小书内容',
        color: 'blue'
    }
}


function createStore (state, storeChange) {
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    const getState = () => state
    const dispatch = (action) => {
        storeChange(state, action)
        listeners.forEach((listener) => listener())
    }
    return { getState, dispatch, subscribe }
}

function storeChange (state, action) {
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            appState.title.text = action.text
        break
        case 'UPDATE_TITLE_COLOR':
            appState.title.color = action.color
        break
        default:
        break
    }
}

const store = createStore(appState, storeChange)
let oldState = store.getState()

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
