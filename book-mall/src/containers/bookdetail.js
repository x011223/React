import React, { Component } from 'react';
import axios from 'axios'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { initBook, initBooks, setBook } from '../reducers/book'
import '../style/book.css'

class BookDetail extends Component {
    constructor () {
        super()
        this.state = {
            book: []
        }
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
            console.log(this.state.book)
        })
    }

    componentDidMount () {
        this.getBookDetail()
    }

    componentWillMount () {
        // this.getBookDetail()
    }

    render () {
        return (
            <div className = "book-detail">
                <div className = "detail-top">
                    <span className = "detail-top-back">返回</span>
                    <span className =" detail-top-title">书籍详情</span>
                    <span className =" detail-top-home">回到首页</span>
                </div>
                <div className ="detail-middle">
                    <div className ="detail-middle-content">
                        <img src = { `http://statics.zhuishushenqi.com${this.state.book.cover}` } />
                        <div className = "detail-content-info">
                            <span>{ this.state.book.title }</span>
                            <span>{ this.state.book.author }&nbsp;|&nbsp;{this.state.book.cat}&nbsp;|&nbsp;{(this.state.book.wordCount / 10000).toFixed(2)}万字</span>
                            {/* <span>{ this.state.book.title }</span>
                            <span>{ this.state.book.title }</span>
                            <span>{ this.state.book.title }</span> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        book: state.book,
        books: state.books
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initBook: (book) => {
            dispatch(initBook(book))
        },
        initBooks: (books) => {
            dispatch(initBooks(books))
        },
        setBook: (book) => {
            dispatch(setBook(book))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BookDetail)