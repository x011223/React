import React, { Component } from 'react';
// import jsonp from '../api/jsonp';
import RankMale from '../containers/rankMale'
import RankFemale from '../containers/rankFemale'
// import RankCategory from '../containers/rankCategory'
// import ReactDOM from 'react-dom';
// let rank

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