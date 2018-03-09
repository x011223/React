import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import '../style/rank.css'

class RankList extends Component {
    static propTypes = {
        rankNames: PropTypes.array
    }

    getRanks (_id) {
        let url = `/api/jumpToRanks`
        const data = {
            id: _id
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    handleJumpToRanks (id, title) {
        this.getRanks(id).then((res) => {
            // console.log(id)
            // this.props.history.push(`/rank/${title}`)
            this.props.history.push({ pathname: `/rank/${id}` , query : { books: res.ranking.books }})
            console.log(this.props.location.query.books)
        })
    }

    render() {
        return (
            <div className = "list-item">
                {/* <h3>{ this.props.rankNames.type }</h3> */}
                { this.props.rankNames.map((item) => <li key = {item._id}
                                                         onClick = { this.handleJumpToRanks.bind(this, item._id, item.title)} 
                                                         className = "rank-name">{item.title}</li>) }
            </div>
        )
    }
}

// const mapDisparchToProps = (dispatch) => {
//     return {
//         initRankByName: (rankByName) => {
//             dispatch(initRankByName(rankByName))
//         }
//     }
// }

export default withRouter(RankList)