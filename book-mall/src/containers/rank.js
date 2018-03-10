import React, { Component } from 'react';
import PropTypes from 'prop-types';

let _books
let books = new Array()

class RankByName extends Component {
    // constructor () {
    //     super()
    //     this.state = {
    //         books: []
    //     }
    // }

    static propTypes = {
        rankByName: PropTypes.array
    }

    _dealBooks () {
        if (!localStorage.getItem('booksCache') || !localStorage.getItem('booksCache').length || books !== localStorage.getItem('booksCache')) {
            _books = this.props.location.query.books 
            localStorage.setItem('booksCache', JSON.stringify(_books))
        }
        books = JSON.parse(localStorage.getItem('booksCache'))
    }

    componentWillMount () {
        this._dealBooks()
    }

    render () {
        return (
            <div className = "rank-books-list">
                {
                    books.map((book) => <li key = { book._id } className = "book-item"> 
                        <img src = { `http://statics.zhuishushenqi.com${book.cover}` } alt = "" className = "book-item-img" />
                        <div className = "item-content">
                            <span className = "item-title">{ book.title }</span>
                            <span className = "item-author">{ book.author }</span>
                            <p className = "item-content-desc">{ book.shortIntro }</p>
                            <span className = "item-people">{ (book.latelyFollower / 10000).toFixed(2) } 万人</span>
                            <span className = "item-rentent">{ book.retentionRatio }%留存</span>
                        </div>
                    </li>)
                }
            </div>
        )
    }
}

export default RankByName