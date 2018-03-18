import React, { Component } from 'react';
import axios from 'axios'
import Chapters from '../components/chapters'
import '../style/chapters.css'

class ChapterList extends Component {
    constructor () {
        super()
        this.state = {
            chapters: [],
            sourceName: '',
            isSourcesOpen: false
        }
    }

    componentDidMount () {
        this.getChapters()
    }

    _back () {
        this.props.history.goBack()
    }

    _getChapters () {
        // console.log(JSON.parse(localStorage.getItem('book_sources')))
        let url = '/api/getBookChapters'
        const data = {
            id: `${JSON.parse(localStorage.getItem('book_sources'))[0]._id}`
            // id: `${this.props.book_sources[0]._id}`
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    getChapters () {
        this._getChapters().then((res) => {
            this.setState({
                chapters: res.chapters,
                sourceName: res.name
            })
        })
    }

    handleClickChapter (id, link) {
        this.props.history.push({pathname: `/chapter/${id}`}, {query: {linkUrl: link}})
    }

    render () {
        return (
            <div className = "chapters">
                <Chapters chapters = { this.state.chapters } 
                          name = { this.state.sourceName }
                          count = { this.state.chapters.length }
                          handleBack = { this._back.bind(this) } 
                          onhandleClickChapter = {this.handleClickChapter.bind(this)}/>
            </div>
        )
    }
}
 
export default ChapterList