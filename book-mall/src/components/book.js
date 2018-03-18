import React, { Component } from 'react'
import PropTypes from 'prop-types'
class Book extends Component {
    static propTypes = {
        book: PropTypes.object
    }

    handleGetBookDetail (id) {
        if (this.props.onHandleGetBookDetail) {
            this.props.onHandleGetBookDetail(id)
        }
    }

    render() {
        const { book } = this.props
        return (
            <li key = { book._id } className = "book-item"
                onClick = { this.handleGetBookDetail.bind(this, book._id) } > 
                <img src = { `http://statics.zhuishushenqi.com${book.cover}` } alt = "" className = "book-item-img" />
                <div className = "item-content">
                    <span className = "item-title">{ book.title }</span>
                    <span className = "item-author">{ book.author }</span>
                    <p className = "item-content-desc">{ book.shortIntro }</p>
                    <span className = "item-people">{ (book.latelyFollower / 10000).toFixed(2) } 万人</span>
                    <span className = "item-rentent">{ book.retentionRatio }%留存</span>
                </div>
            </li>
        )
    }
}

export default Book