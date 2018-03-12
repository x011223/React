import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import '../style/rank.css'

class RankList extends Component {
    static propTypes = {
        rankNames: PropTypes.array
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
            this.props.history.push({ pathname: `/rank/${id}` ,
                query : { books: res.ranking.books }})
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

export default withRouter(RankList)