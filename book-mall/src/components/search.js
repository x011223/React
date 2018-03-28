import React, { Component } from 'react'
import Book from '../components/book'
import { withRouter } from 'react-router-dom'

class Search extends Component {
    jumpToBookDetail (id) {
        this.props.history.push(`/bookdetail/${id}`)
    }
    render () {
        const { resultBooks } = this.props
        return (
            <div>
                {resultBooks.length > 0 ?  resultBooks.map((book) => <Book book = { book } key = { book._id } onHandleGetBookDetail = { this.jumpToBookDetail.bind(this, book._id) } />)  : '搜索好书'}
            </div>
        )
    }
}

export default withRouter(Search)