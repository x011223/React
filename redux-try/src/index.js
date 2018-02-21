// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import ReactDOM from 'react-dom'
// import Header from './header'
// import Content from './content'
// import './index.css'

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
    // 获取数据内容
    const getState = () => state
    // 提交数据更改
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }
    // 初始化数据
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

const store = createStore(storeChange)
let oldState = store.getState()
store.subscribe(() => {
    const newState = store.getState() // 数据可能变化，获取新的 state
    console.log(newState)
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

function renderApp (newState, oldState = { }) {
    if (oldState === newState) {
        return
    }
    renderTitle(newState.title, oldState.title)
    renderContent(newState.content, oldState.content)
}

function renderTitle (newTitle, oldTitle = {}) {
    if (oldTitle === newTitle) {
        return
    }
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = newTitle.text
    titleDOM.style.color = newTitle.color
}

function renderContent (newContent, oldContent = {}) {
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

// class Index extends Component {
//   render () {
//     return (
//       <div>
//         <Header />
//         <Content />
//       </div>
//     )
//   }
// }

// ReactDOM.render(
//   <Index />,
//   document.getElementById('root')
// )