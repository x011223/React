import React, {Component} from 'react'
import '../style/shelf.css'

class ShelfBook extends Component {
    render () {
        const { shelfBook } = this.props
        return (
            <li className = "shelf-book-item" id = "shelfBook">
                <img src = { `http://statics.zhuishushenqi.com${shelfBook.cover}` } className = "shelf-item-img" />
                <span className = "shelf-item-author">{shelfBook.author}</span>
            </li>
        )
    }
}

export default ShelfBook