import React, { Component } from 'react';
import axios from 'axios'
import Chapters from '../components/chapters'
import '../style/chapters.css'
import { connect } from 'react-redux'
import { initLinks } from '../actions/index'

class ChapterList extends Component {
    constructor() {
        super()
        this.state = {
            chapters: [],
            sourceName: '',
            isSourcesOpen: false
        }
    }

    componentDidMount() {
        this.getChapters()
    }

    _back() {
        this.props.history.goBack()
    }

    _getChapters() {
        let url = '/api/getBookChapters'
        const data = {
            id: `${JSON.parse(localStorage.getItem('book_sources'))[0]._id}`
                // id: `${this.props.book_sources[0]._id}`
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    getChapters() {
        this._getChapters().then((res) => {
            let links = []
                // for (let i = 0; i < res.chapters.length; i++) {
                //     links.push(res.chapters[i])              
                // }
            links = res.chapters
            this.props.initLinks(links)
            this.setState({
                chapters: res.chapters,
                sourceName: res.name
            })
        })
    }

    handleClickChapter(index, link) {
        this.props.history.push({ pathname: `/chapter/${index}` }, { query: { linkUrl: link } })
    }

    handleReverse() {
        let chaptersReverse = this.state.chapters
        this.setState({ chapters: chaptersReverse.reverse() })
    }

    render() {
        return ( <
            div className = "chapters" >
            <
            Chapters chapters = { this.state.chapters }
            name = { this.state.sourceName }
            count = { this.state.chapters.length }
            handleBack = { this._back.bind(this) }
            onhandleClickChapter = { this.handleClickChapter.bind(this) }
            onhandleReverse = { this.handleReverse.bind(this) }
            /> </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        linksReducer: state.linksReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initLinks: (links) => {
            dispatch(initLinks(links))
        }
    }
}

// export default ChapterList
export default connect(mapStateToProps, mapDispatchToProps)(ChapterList)