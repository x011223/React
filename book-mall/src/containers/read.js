import React, { Component } from 'react';
import Read from '../components/read'
import '../style/readpage.css'
import axios from 'axios'
class ReadPage extends Component {
    constructor () {
        super()
        this.state = {
            title: '',
            content: []
        }
    }

    componentDidMount () {
        this.getChapterContent()
    }

    _getChapterContent () {
        let url = '/api/getChapterContent'
        const data = {
            link: this.props.location.state.query.linkUrl
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    getChapterContent () {
        this._getChapterContent().then((res) => {
            // let reg = /^\s{2,}/gm
            let reg = /\n/gm
            let c = res.chapter.cpContent.split(reg)
            this.setState(
                {title: res.chapter.title}
            )
            this.setState(
                {content: c}
            )
            console.log(this.state)
        })
    }

    render () {
        return (
            <div className = "read-page-wrapper">
                <Read title = {this.state.title} content = {this.state.content} />
            </div>
            
        )
    }
}

export default ReadPage