import React, { Component } from 'react';
import axios from 'axios'

class MenuEntery extends Component {
    onHandleClick () {
        if (this.props.onHandleClick) {
            this.props.onHandleClick()
        }
    }

    componentDidMount () {
        this.setBookSources()        
    }

    _setBookSources () {
        let url = '/api/getBookSource'
        const data = {
            id: this.props.id
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    setBookSources () {
        this._setBookSources().then((res) => {
            localStorage.setItem('book_sources', JSON.stringify(res))
        })
    }


    render () {
        const { longIntro, onHandleClick, lastChapter } = this.props
        return (
            <div className = "detail-bottom-intro">
                <p className = "bottom-longIntro">{longIntro}</p>
                <div className = "bottom-menu" onClick = { onHandleClick.bind(this) }>
                    <span className = "bottom-menu-title">目录</span>
                    <span className = "bottom-menu-lastchapter">{lastChapter}</span>
                </div>
            </div>
        )
    }
}

export default MenuEntery