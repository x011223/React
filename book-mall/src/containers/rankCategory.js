import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// import { initBooks, setBooks } from '../reducers/book'
import { setRankId } from '../reducers/rank'
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

const mapStateToProps = (state) => {
    return {
        // books: state.books
        // rank_id: state.rank_id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // initRankId: (rank_id) => {
        //     dispatch(initRankId(rank_id))
        // },
        setRankId: (rank_id) => {
            dispatch(setRankId(rank_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RankList))