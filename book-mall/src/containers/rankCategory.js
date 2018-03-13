import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { initBooks, setBooks } from '../reducers/book'
import '../style/rank.css'

class RankList extends Component {
    static propTypes = {
        rankNames: PropTypes.array,
        books: PropTypes.array
    }

    _getRanks (_id) {
        let url = `/api/jumpToRanks`
        const data = {
            id: _id
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    handleJumpToRanks (id, title) {
        this._getRanks(id).then((res) => {
            console.log(res)
            this.props.setBooks(res.ranking.books)
            this.props.history.push(`/rank/${id}`)
        })
    }

    render() {
        return (
            <div className = "list-item">
                { this.props.rankNames.map((item) => <li key = {item._id}
                                                         onClick = { this.handleJumpToRanks.bind(this, item._id, item.title)} 
                                                         className = "rank-name">{item.title}</li>) }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // books: state.books
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initBooks: (books) => {
            dispatch(initBooks(books))
        },
        setBooks: (books) => {
            dispatch(setBooks(books))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RankList))
// export default withRouter(RankList)