import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import Book from '../components/book'
import { connect } from 'react-redux'
import { initBooks } from '../reducers/book'
 
class RankByName extends Component {
    static propTypes = {
        rankByName: PropTypes.array
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
            console.log(res)
        })
    }

    render () {
        return (
            <div className = "rank-books-list">
                <div className = "rank-back" onClick = {this._rankBack.bind(this) }> 
                    <span className = "back">返回</span>
                </div>
                {
                    this.props.books.map((item) => <Book book = { item } onHandleGetBookDetail = { this.handleGetBookDetail.bind(this, item._id) } key = { item._id } />)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initBooks: (books) => {
            dispatch(initBooks(books))
        }
    }
}

// export default RankByName
export default connect(mapStateToProps, mapDispatchToProps)(RankByName)