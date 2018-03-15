import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import '../style/rank.css'

class RankList extends Component {
    static propTypes = {
        rankNames: PropTypes.array,
        books: PropTypes.array
    }

    handleJumpToRanks (rank_id) {
        this.props.history.push(`/rank/${rank_id}`)   
    }

    render() {
        return (
            <div className = "list-item">
                { this.props.rankNames.map((item) => <li key = {item._id}
                                                         onClick = { this.handleJumpToRanks.bind(this, item._id)} 
                                                         className = "rank-name">{item.title}</li>) }
            </div>
        )
    }
}

export default withRouter(RankList)