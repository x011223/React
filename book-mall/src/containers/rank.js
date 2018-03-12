import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import Book from '../components/book'
import { connect } from 'redux'
 
let _books
let books = new Array()

class RankByName extends Component {
    static propTypes = {
        rankByName: PropTypes.array
    }

    _dealBooks () {
        if (!localStorage.getItem('booksCache') 
            || !localStorage.getItem('booksCache').length 
            || books !== localStorage.getItem('booksCache')) {
            _books = this.props.location.query.books 
            localStorage.setItem('booksCache', JSON.stringify(_books))
        }
        books = JSON.parse(localStorage.getItem('booksCache'))
    }

    _rankBack () {
        this.props.history.goBack()
    }

    _getBookDetail (_id) {
        let url = `/api/getBookDetail`
        const data = {
            id: _id
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    handleGetBookDetail (book_id) {
        this._getBookDetail(book_id).then((res) => {
            // this.props.initBookId(res._id)
            // this.props.setBook(res)
            console.log(res)
        })
    }

    componentWillMount () {
        this._dealBooks()
    }

    render () {
        return (
            <div className = "rank-books-list">
                <div className = "rank-back" onClick = {this._rankBack.bind(this) }> 
                    <span className = "back">返回</span>
                </div>
                {
                    books.map((item) => <Book book = { item } onHandleGetBookDetail = { this.handleGetBookDetail.bind(this, item._id) } key = { item._id } />)
                }
            </div>
        )
    }
}


export default RankByName
// export default connect(map)