import React, { Component } from 'react'

class Chapters extends Component {
    handleChangeSource (props) {
        if (this.props.handleChangeSource()) {
            this.props.handleChangeSource()
        }
    }

    render () {
        return (
            <div className = "chapters-list">
                <div className = "chapters-list-operator">
                    <span className = "operator-back" onClick = { this.props.handleBack.bind(this) }>返回</span>
                    <span className = "operator-change" onClick = { this.props.handleChangeSource.bind(this) }>换源</span>
                </div>
                <div className = "chapters-list-content">
                    { this.props.chapters.map((chapter, index) => <li key = {index}
                                                                      className = "content-item" >
                        { chapter.title }
                    </li>) }
                </div>
            </div>
        )
    }
}

export default Chapters