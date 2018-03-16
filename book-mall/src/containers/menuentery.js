import React, { Component } from 'react';
import axios from 'axios'

class MenuEntery extends Component {
    onHandleClick () {
        this.getBookSourceOfVip()
    }

    _getBookChaptersOfVip () {
        let url = '/api/getBookSource'
        const data = {
            id: this.props.id
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    getBookSourceOfVip () {
        this._getBookChaptersOfVip().then((res) => {
            console.log(res)
        })
    }


    render () {
        return (
            <div className = "detail-bottom-intro" onClick = {this.onHandleClick.bind(this)}>
                <p className = "bottom-longIntro">{this.props.longIntro}</p>
                <div className = "bottom-menu">
                    <span className = "bottom-menu-title">目录</span>
                    <span className = "bottom-menu-lastchapter">{this.props.lastChapter}</span>
                </div>
            </div>
        )
    }
}

export default MenuEntery