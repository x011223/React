import React, { Component } from 'react';
import Search from '../components/search'
import axios from 'axios'
let searchString
class SearchWrapper extends Component {
    constructor () {
        super()
        this.state = {
            searchString: '',
            searchResult: ''
        }
    }

    componentWillUnmount () {
        window.removeEventListener('keyup', this.getSearchString)
    }

    debounce (func, wait) {
        let timer
        return function (...args) {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                func.apply(this, args)
            }, wait);
        }
    }

    handleChangeText (e) {
        // let func = this.search()
        // let tim = null
        // let target = e.target
        // let value = target.value
        // window.addEventListener('keyup', function getSearchString () {
        //     clearTimeout(tim)
        //     tim = setTimeout((value) => {
        //         searchString = value
        //     }, 300);
        //     this.debounce(func, 500)  
        // }.bind(this))
        this.search(e)
    }

    _search (string) {
        let url = '/api/search'
        const data = {
            searchString: string
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    search (e) {
        // const { searchString } = this.state
        let value = e.target.value
        let a = this._search(value).then((res) => {
            this.setState(
                { searchResult: res.books }
            )
        })
        this.debounce(a, 500)
        // let timer = null
        // clearTimeout(timer)
        // let a = e.target.value
        // timer = setTimeout(() => {
        //     let value = a
        //     console.log(value)
        //     this._search(value).then((res) => {
        //         this.setState(
        //             { searchResult: res.books }
        //         )
        //     })
        // }, 500)
    }

    render () {
        const { searchResult } = this.state
        return (
            <div>
                <div>
                    <input 
                        placeholder = '请输入关键词' 
                        style = {{ 'textIndent': 16 }}
                        value = { searchString }
                        onChange = { this.handleChangeText.bind(this) } />
                </div>
                <div>
                    <Search resultBooks = { searchResult } />
                </div>
            </div>
        )
    }
}

export default SearchWrapper