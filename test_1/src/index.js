import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import CommentApp from './CommentApp'

class Title extends Component {
    handleClick (e) {
        console.log(e.target.innerHTML)
    }
    render () {
        return (
            <div onClick={ this.handleClick }>
                <h1>React 小书</h1>
            </div>
        )
    }
}

function Header (props) {
    return (
        <div>
            <p>React 小书 Header</p>
        </div>
    )
}

class Main extends Component {
    render () {
        return (
            <div>
                <p>React 小书 Main</p>
            </div>
        )
    }
}
class Footer extends Component {
    render () {
        return (
            <div>
                <p>React 小书 Footer</p>
            </div>
        )
    }
}

class Clock extends Component {
    constructor (props) {
        super(props)
        this.state = {
            date: new Date()
        }
    }

    componentDidMount () {
        // 挂载  计时器
        this.timerId = setInterval (
            () => this.tick(),
            1000
        )
    }

    componentWillUnmount () {
        // 卸载 计时器
        clearInterval(this.timerId)
    }

    tick () {
        this.setState(
            {
                date: new Date()
            }
        )
    }
    render () {
        return (
            <div>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        )
    }
}

class ActionLink extends Component {
    handleClick(e) {
        // 不能使用返回 false 的方式阻止默认行为，而必须明确的使用 preventDefault
        e.preventDefault();
        alert('您已经成功点击,但页面被阻止跳转');
    }
    render () {
        return (
            <a href="https://doc.react-china.org/docs/handling-events.html" onClick={this.handleClick}>
                Click me
            </a>
        );
    }
}  

class Toggle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isToggleOn: true,
            // isShowActionLink: true,
        }
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(
            prevState => (
                { isToggleOn: !prevState.isToggleOn }
                // { isShowActionLink: !prevState.isShowActionLink }
            )
        );
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

class Index extends Component {
    render () {
        return (
            <div>
                <div className='topNote'>
                    < Title />
                    < Header />
                    < Main />
                    < Footer />
                    < Clock />
                    < ActionLink />
                    < Toggle />
                </div>
                < CommentApp />                
            </div>
        )
    }
}

ReactDOM.render( 
    < Index />,
    document.getElementById('root')
);