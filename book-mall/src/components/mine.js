import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import ShelfBooks from '../containers/shelf'

class Mine extends Component {
    render () {
        return (
            <div className = "mine">
                <ShelfBooks />
            </div>
        )
    }
}

export default Mine