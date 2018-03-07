import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import './style/index.css'
import Mine from './components/mine'
import Search from './components/search';
import Home from './components/home';
// import { Provider } from 'react-redux';


class Index extends Component {
    render () {
        return (
            // <div>
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
                    </div>    
                </Router>
            // </div>
        )
    }
}

ReactDOM.render(
    // <Provider store ={ store } >
    // <Provider>
        <Index />,
    // </Provider>,
    document.getElementById('root')
);
