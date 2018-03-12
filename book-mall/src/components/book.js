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
        return (
            <li key = { this.props.book._id } className = "book-item"
                onClick = { this.handleGetBookDetail.bind(this, this.props.book._id) } > 
                <img src = { `http://statics.zhuishushenqi.com${this.props.book.cover}` } alt = "" className = "book-item-img" />
                <div className = "item-content">
                    <span className = "item-title">{ this.props.book.title }</span>
                    <span className = "item-author">{ this.props.book.author }</span>
                    <p className = "item-content-desc">{ this.props.book.shortIntro }</p>
                    <span className = "item-people">{ (this.props.book.latelyFollower / 10000).toFixed(2) } 万人</span>
                    <span className = "item-rentent">{ this.props.book.retentionRatio }%留存</span>
                </div>
            </li>
        )
    }
}

export default Book