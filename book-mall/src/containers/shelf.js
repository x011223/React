import React, { Component } from 'react'
import ShelfBook from '../components/shelf'
import '../style/shelf.css'

class ShelfBooks extends Component {
    constructor () {
        super()
        this.state = {
            shelfBooks: [],
            isDeleteShow: false,
        }
    }
    
    componentDidMount () {
        this.getShelfBooks().then((shelfBook) => {
             this.setState(
                {shelfBooks: shelfBook}
            ) 
        })
    }

    getShelfBooks () {
        const promise = new Promise((resolve, reject) => {
            let shelfBooksCache = localStorage.getItem('shelfBooks') ? JSON.parse(localStorage.getItem('shelfBooks')) : []   
            if (this.state.shelfBooks) {
                resolve(shelfBooksCache)
            } else {
                reject()
            }
        }) 
        return promise
    }

    showDelete () {
        this.setState(
            this.setState(
                {isDeleteShow: !this.state.isDeleteShow}
            )
        )
    }
    
    handleDeleteShelfBook (index) {
        console.log(index)
        let books = JSON.parse(localStorage.getItem('shelfBooks'))
        books = [...books.slice(0, index),
            ...books.slice(index + 1)]
        localStorage.setItem('shelfBooks', JSON.stringify(books))
        console.log(books)
        this.setState(
            {shelfBooks: books}
        )
    }

    render () {
        const { shelfBooks, isDeleteShow } = this.state
        return (
            <div>
                <div className = "shelf-operator">
                    <span onClick = {this.showDelete.bind(this)}>
                        {!isDeleteShow && (shelfBooks.length === undefined || !shelfBooks.length) ? '' : 
                            isDeleteShow && shelfBooks.length ? '完成' : '编辑'}
                    </span>
                </div>
                { shelfBooks.map((shelfBook, index) =>
                    <ShelfBook key = { index } 
                               shelfBook = { shelfBook } 
                               shelfIndex = { index } 
                               isDeleteShow = { isDeleteShow }
                               onhandleDeleteShelfBook = {this.handleDeleteShelfBook.bind(this, index)}/>) }
            </div>
        )
    }
}

export default ShelfBooks