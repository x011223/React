import React, { Component } from 'react';
import axios from 'axios'
// import PropTypes from 'prop-types';
import '../style/book.css'
import Rate from '../components/rate'
import MenuEntery from './menuentery'
import DetailContent from '../components/detailcontent'
import { connect } from 'react-redux'
import { initLinks } from '../actions/index'

class BookDetail extends Component {
    constructor () {
        super()
        this.state = {
            book: [],
            textOfShelf: '',
            isInShelf: false,
            shelves: []
        }
    }
    
    format = date => {
        return this.getDateDiff(new Date(date));
    }
      
    getDateDiff (dateTimeStamp) {
        let minute = 1000 * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let now = new Date().getTime();
        let diffValue = now - dateTimeStamp;
        if (diffValue < 0) {
          return;
        }
       
        let dayC = diffValue / day;
        let hourC = diffValue / hour;
        let minC = diffValue / minute;
        let result = "";
        if (dayC >= 7) {
          result = dateTimeStamp.toLocaleDateString().replace(/\//g, "-");
        } else if (dayC >= 1) {
          result = "" + Number.parseInt(dayC, 10) + "天前";
        } else if (hourC >= 1) {
          result = "" + Number.parseInt(hourC, 10) + "小时前";
        } else if (minC >= 1) {
          result = "" + Number.parseInt(minC, 10) + "分钟前";
        } else {
          result = "刚刚";
        }
        return result;
    }

    _getBookDetail () {
        let url = `/api/getBookDetail`
        const data = {
            id: this.props.match.params.id
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    getBookDetail () {
        this._getBookDetail().then((res) => {
            this.setState(
                { book: res }
            )
            this.isInShelf()
        })
    }

    handleShelf () {
        let { book, textOfShelf } = this.state
        let bookCache = book
        let shelfBooks = localStorage.getItem('shelfBooks') ? JSON.parse(localStorage.getItem('shelfBooks')) : []        
        if (textOfShelf === '加入书架') {
            shelfBooks = [...shelfBooks, bookCache]
            localStorage.setItem('shelfBooks', JSON.stringify(shelfBooks))
            this.setState(
                {textOfShelf: '正在追书'}
            )
        }  
    }

    isInShelf () {
        const { book, textOfShelf } = this.state
        let bookInShelf = localStorage.getItem('shelfBooks') ? JSON.parse(localStorage.getItem('shelfBooks')) : []
        if (!bookInShelf.length) {
            this.setState(
                {textOfShelf: '加入书架'}
            )
        } else {
            for (let i = 0; i < bookInShelf.length; i++) {
                if (bookInShelf[i]._id === book._id) {
                    this.setState(
                        {textOfShelf: '正在追书'}
                    )
                    // break;
                } else {
                    this.setState(
                        {textOfShelf: '加入书架'}
                    )
                }
            }
        }
        return textOfShelf                    
    }

    handleMenuClick () {
        this.props.history.push(`/chapters/${this.props.match.params.id}`)
    }

    detailBack () {
        this.props.history.goBack()
    }

    detailToHome () {
        this.props.history.push('/home')
    }

    startRead () {
        console.log(this.state.book)
        this._getChapters().then((res) => {
            console.log(res)
            this.props.history.push({pathname: `/chapter/0`}, {query: {linkUrl: res.chapters[0].link}})
            this.props.initLinks(res.chapters)
        })
    } 

    _getChapters () {
        let url = '/api/getBookChapters'
        const data = {
            id: `${JSON.parse(localStorage.getItem('book_sources'))[0]._id}`
            // id: `${this.props.book_sources[0]._id}`
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    componentDidMount () {
        this.getBookDetail()
    }

    render () {
        const { book, textOfShelf } = this.state
        return (
            <div className = "book-detail">
                <div className = "detail-top">
                    <span className = "detail-top-back top-three" onClick = { this.detailBack.bind(this) }>返回</span>
                    <span className = "detail-top-title top-three">书籍详情</span>
                    <span className = "detail-top-home top-three" onClick = { this.detailToHome.bind(this) }>回到首页</span>
                </div>
                <div className ="detail-middle">
                    <DetailContent book = { book } 
                                   updated = { this.format(book.updated) } 
                                   textOfShelf = { textOfShelf }
                                   onHandleShelf = { this.handleShelf.bind(this) }
                                   onHandleStartRead = { this.startRead.bind(this) } />
                    <div className = "detail-rate-wrapper">
                        <Rate title = {'追人气'} number = {(book.latelyFollower / 10000).toFixed(1) + '万'} />
                        <Rate title = {'读者留存率'} number = {book.retentionRatio + '%'} />
                        <Rate title = {'日更字数/天'} number = {book.serializeWordCount} />                      
                    </div>
                </div>
                <MenuEntery longIntro = { book.longIntro } 
                            lastChapter = {`[${ this.format(book.updated) }更新]  ${book.lastChapter}`}
                            id = { this.props.match.params.id }
                            onHandleClick = { this.handleMenuClick.bind(this) } />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // linksReducer: state.linksReducer
    }
}

const mapDispatchToProps  = (dispatch) => {
    return {
        initLinks: (links) => {
            dispatch(initLinks(links))
        }
    }
}

// export default BookDetail
export default connect(mapStateToProps, mapDispatchToProps)(BookDetail)