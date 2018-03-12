import React, { Component } from 'react'
import RankCategory from './rankCategory'
import axios from 'axios'
import '../style/rank.css'

class RankMale extends Component {

    constructor () {
        super()
        this.state = {
            ranks: []
        }
    }

    getRankings () {
        const url = '/api/getRanks'
        return axios.get(url).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    componentWillMount () {
        this.getRankings().then((res) => {
            this.setState(
                { ranks: res.female }
            )     
        })
    }

    render () {
        return (
            <div>
                <div className = "rank-female">
                    <span className ="title" >女生</span>
                </div>
                <RankCategory rankNames = { this.state.ranks } />    
            </div>
        )
    }
}

export default RankMale