import React, { Component } from 'react'
import ShelfBook from '../components/shelf'

class ShelfBooks extends Component {
    constructor () {
        super()
        this.state = {
            shelfBooks: [],
            isDelteShow: false
        }
    }
    
    componentDidMount () {
        this.getShelfBooks().then((shelfBook) => {
             this.setState(
                {shelfBooks: shelfBook}
            ) 
            console.log(this.state.shelfBooks)
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

    render () {
        const { shelfBooks } = this.state
        return (
            <div>
                { shelfBooks.map((shelfBook, index) => <ShelfBook key = {index} shelfBook = { shelfBook }/>) }
            </div>
        )
    }
}

export default ShelfBooks