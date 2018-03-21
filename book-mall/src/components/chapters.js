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

    onhandleReverse () {
        if (this.props.onhandleReverse) {
            this.props.onhandleReverse()
        }
    }

    render () {
        const { chapters, name, count, handleBack, onhandleClickChapter, onhandleReverse } = this.props
        return (
            <div className = "chapters-list">
                <div className = "chapters-list-operator">
                    <span className = "operator-back" onClick = { handleBack.bind(this) }>返回</span>
                    <span className = "operator-change">{ name }</span>
                </div>
                <div className = "chapters-sub">
                    <span className = "sub-chapters-count">目录:&nbsp;共{count}章</span>
                    <span className = "sub-chapters-reverse" onClick = { onhandleReverse.bind(this) }>倒序</span>
                </div>
                <div className = "chapters-list-content">
                    { chapters.map((chapter, index) => <li key = {index}
                                                                      className = "content-item"
                                                                      onClick = {onhandleClickChapter.bind(this, index, chapter.link)} >
                        {index + 1}&nbsp;&nbsp;&nbsp;{ chapter.title }
                    </li>) }
                </div>
            </div>
        )
    }
}

export default Chapters