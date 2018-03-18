import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import './style/index.css'
import Mine from './components/mine'
import Search from './components/search';
import Home from './components/home';
import Rank from './containers/rank'
import BookDetail from './containers/bookdetail'
import ChapterList from './containers/chapters'
import { Provider } from 'react-redux';
import ReadPage from './containers/read'

// const store = createState
// const store = createStore(bookSourceStore, chaptersLinksStore, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
class Index extends Component {
    render () {
        return (
            <Router>
                <div className = "router-tab">
                    <NavLink to = '/mine' className = "router-tab-item" activeClassName = "router-mine-active">
                        我的
                    </NavLink>
                    <NavLink to = '/home' className = "router-tab-item" activeClassName = "router-home-active" >
                        首页
                    </NavLink>
                    <NavLink to = '/search' className = "router-tab-item" activeClassName = "router-search-active" >
                        搜索
                    </NavLink>
                    <Route path = '/mine' component = { Mine } />
                    <Route path = '/home' component = { Home } />
                    <Route path = '/search' component = { Search } />
                    <Route path = '/rank/:id' component = { Rank } />
                    <Route path = '/bookdetail/:id' component = { BookDetail } />
                    <Route path = '/chapters/:id' component = { ChapterList } />
                    <Route path = '/chapter/:id' component = { ReadPage } />
                </div>    
            </Router>
        )
    }
}

ReactDOM.render(
    // <Provider store = { store } >
        <Index />,
    // </Provider>,
    document.getElementById('root')
);
