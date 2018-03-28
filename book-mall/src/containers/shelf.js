import React, { Component } from 'react'
import ShelfBook from '../components/shelf'
import axios from 'axios'
import { connect } from 'react-redux'
import { initLinks } from '../actions/index'
import { withRouter } from 'react-router-dom'
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
            this.getShelfBookSources()
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
        let books = JSON.parse(localStorage.getItem('shelfBooks'))
        books = [...books.slice(0, index),
            ...books.slice(index + 1)]
        localStorage.setItem('shelfBooks', JSON.stringify(books))
        this.setState(
            {shelfBooks: books}
        )
    }

    _getShelfBookSources (_id) {
        let url = '/api/getBookSource'
        const data = {
            id: _id
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    getShelfBookSources () {
        let { shelfBooks } = this.state
        let shelfBookLength = shelfBooks.length
        for (let i = 0; i < shelfBookLength; i++) {    
            this._getShelfBookSources(shelfBooks[i]._id).then((res) => {
                sessionStorage.setItem(`shelf_books_sources[${i}]`, JSON.stringify(res))
            })
        }
    }

    _getShelfBookChapters (index) {
        let url = '/api/getBookChapters'
        const data = {
            id: `${JSON.parse(sessionStorage.getItem(`shelf_books_sources[${index}]`))[0]._id}`
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    getShelfBookChapters (index) {
        this._getShelfBookChapters(index).then((res) => {
            let links = []
            links = res.chapters
            this.props.initLinks(links)
            this.props.history.push(
                { 
                    pathname: `/chapter/${index}`}, 
                    { 
                        query: {linkUrl: this.props.linksReducer.linksReducer[0].link, 
                        bookIndex: index
                    }
                }
            )
        })
    }

    shelfBookRead (book, index) {
        if (sessionStorage.getItem(`shelf_books_sources[${index}]`)) {
            this.getShelfBookChapters(index)
        }
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
                <div>
                    { shelfBooks.map((shelfBook, index) =>
                        <ShelfBook key = { index } 
                               shelfBook = { shelfBook } 
                               shelfIndex = { index } 
                               isDeleteShow = { isDeleteShow }
                               onhandleDeleteShelfBook = { this.handleDeleteShelfBook.bind(this, index) }
                               handleShelfBookRead = { this.shelfBookRead.bind(this, shelfBook, index) }/>) }
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        linksReducer: state.linksReducer
    }
}

const mapDispatchToProps  = (dispatch) => {
    return {
        initLinks: (links) => {
            dispatch(initLinks(links))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ShelfBooks))