import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import Book from '../components/book'
import { connect } from 'react-redux'
import { initBooks, setBooks } from '../reducers/book'
import { initRankId } from '../reducers/rank'
import { withRouter } from 'react-router-dom'
 
class RankByName extends Component {
    constructor () {
        super()
        this.state = {
            books: []
        }
    }
    static propTypes = {
        rankByName: PropTypes.array,
    }

    _rankBack () {
        this.props.history.goBack()
    }

    _getRanks () {
        let url = `/api/jumpToRanks`
        const data = {
            id: this.props.match.params.id
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    handleGetRanks () {
        this._getRanks().then((res) => {
            // this.props.setBooks(res.ranking.books)
            this.setState(
                { books: res.ranking.books }
            )
        })
    }

    handleJumpToBookDetail (id) {
        this.props.history.push(`/bookdetail/${id}`)
    }

    componentDidMount () {
        this.handleGetRanks()
    }

    // _getBookDetail (_id) {
    //     let url = `/api/getBookDetail`
    //     const data = {
    //         id: _id
    //     }
    //     return axios.get(url, { params: data }).then((res) => {
    //         return Promise.resolve(res.data)
    //     })
    // }

    render () {
        return (
            <div className = "rank-books-list">
                <div className = "rank-back" onClick = {this._rankBack.bind(this) }> 
                    <span className = "back">返回</span>
                </div> 
                {
                    this.state.books.map((item) => <Book book = { item } onHandleGetBookDetail = { this.handleJumpToBookDetail.bind(this, item._id) } key = { item._id } />)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initRankId: (rank_id) => {
            dispatch(initRankId(rank_id))
        },
        initBooks: (books) => {
            dispatch(initBooks(books))
        },
        setBooks: (books) => {
            dispatch(setBooks(books))
        },
    }
}

// export default RankByName
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RankByName))