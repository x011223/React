import React, {Component} from 'react'
import '../style/shelf.css'

class ShelfBook extends Component {
    render () {
        const { shelfBook, isDeleteShow, onhandleDeleteShelfBook, handleShelfBookRead } = this.props
        return (
            <li className = "shelf-book-item" id = "shelfBook">
                <img src = { `http://statics.zhuishushenqi.com${shelfBook.cover}` } 
                      className = "shelf-item-img"  
                      onClick = {handleShelfBookRead.bind(this)}
                      alt = ""/>
                <div className = "shelf-item-bottom">
                    <span className = "shelf-item-author">{shelfBook.author}</span>
                    <span className = "shelf-item-delete" onClick = {onhandleDeleteShelfBook.bind(this)}>{isDeleteShow ? '删除' : ''}</span>
                </div>
            </li>
        )
    }
}

export default ShelfBook