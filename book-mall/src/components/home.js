import React, { Component } from 'react';
import RankMale from '../containers/rankMale'
import RankFemale from '../containers/rankFemale'

class Home extends Component {
    render () {
        return (
            <div>
                <RankMale />
                <RankFemale />
            </div>
        )
    }
}

export default Home