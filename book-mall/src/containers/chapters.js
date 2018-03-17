import React, { Component } from 'react';
import axios from 'axios'
import Chapters from '../components/chapters'
import { connect } from 'react-redux'
import { initBookSources } from '../reducers/booksources'

class ChapterList extends Component {
    constructor () {
        super()
        this.state = {
            chapters: [],
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
        let url = '/api/getBookChapters'
        const data = {
            id: '5817f1137063737f47bb47fd'
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    getChapters () {
        this._getChapters().then((res) => {
            this.setState({
                chapters: res.chapters
            })
        })
    }

    changeSource () {
        console.log("Change Source")
        this.setState(
            { isSourcesOpen: !this.state.isSourcesOpen }
        )
    }

    render () {
        return (
            <div>
                <Chapters chapters = { this.state.chapters } 
                          handleChangeSource = { this.changeSource.bind(this) }
                          handleBack = { this._back.bind(this) } />
                <div className = {this.state.isSourcesOpen ? 'sourcesOpen' : 'sourcesClose'} >
                    书源列表
                </div>        
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        book_sources: state.book_sources
    }
}
 
export default connect(mapStateToProps)(ChapterList)