import React, { Component } from 'react';

class Rate extends Component {
    render () {
        return (
            <div className = "layout-wrapper">
                <div className = "rate-item">
                    <span className = "item-title">{this.props.title}</span>
                    <span className = "item-number">{this.props.number}</span>           
                </div>
            </div>
        )
    }
}

export default Rate