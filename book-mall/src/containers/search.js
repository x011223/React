import React, { Component } from 'react';
import Search from '../components/search'
import axios from 'axios'
import '../style/search.css'

let searchString

class SearchWrapper extends Component {
    constructor () {
        super()
        this.state = {
            searchString: '',
            searchResult: ''
        }
    }

    // debounce (func, wait) {
    //     let timer
    //     return function (...args) {
    //         if (timer) {
    //             clearTimeout(timer)
    //         }
    //         timer = setTimeout(() => {
    //             func.apply(this, args)
    //         }, wait);
    //     }
    // }

    _search (string) {
        let url = '/api/search'
        const data = {
            searchString: string
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    search (value) {
        this._search(value).then((res) => {
            this.setState(
                { searchResult: res.books }
            )
        })
    }

    handleClickSearch () {
        let value = this.searchInput.value
        this.search(value)
    }

    render () {
        const { searchResult } = this.state
        return (
            <div className = "search">
                <div className = "search-input">
                    <input 
                        ref = { (input) => { this.searchInput = input } }
                        placeholder = '请输入关键词' 
                        style = {{ 'textIndent': 16 }}
                        value = { searchString }
                        className = "input"
                        />
                    <div onClick = { this.handleClickSearch.bind(this) } className = "search-text" >
                        搜索
                    </div>
                </div>
                <div className = "search-result">
                    <Search resultBooks = { searchResult } />
                </div>
            </div>
        )
    }
}

export default SearchWrapper