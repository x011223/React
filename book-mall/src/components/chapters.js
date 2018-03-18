import React, { Component } from 'react'

class Chapters extends Component {
    handleChangeSource (props) {
        if (this.props.handleChangeSource()) {
            this.props.handleChangeSource()
        }
    }

    onhandleClickChapter (id) {
        if (this.props.onhandleClickChapter) {
            this.props.onhandleClickChapter(id)
        }
    }

    render () {
        return (
            <div className = "chapters-list">
                <div className = "chapters-list-operator">
                    <span className = "operator-back" onClick = { this.props.handleBack.bind(this) }>返回</span>
                    <span className = "operator-change">{ this.props.name }</span>
                </div>
                <div className = "chapters-sub">
                    <span className = "sub-chapters-count">目录:&nbsp;共{this.props.count}章</span>
                    <span className = "sub-chapters-reverse">倒序</span>
                </div>
                <div className = "chapters-list-content">
                    { this.props.chapters.map((chapter, index) => <li key = {index}
                                                                      className = "content-item"
                                                                      onClick = {this.props.onhandleClickChapter.bind(this, chapter.id, chapter.link)} >
                        {index+1}&nbsp;&nbsp;&nbsp;{ chapter.title }
                    </li>) }
                </div>
            </div>
        )
    }
}

export default Chapters