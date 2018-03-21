import React, { Component } from 'react';
import '../style/readpage.css'

class Read extends Component {

    render () {
        const { content, title, onHandleShowOperator, order } = this.props
        return (
            <div className = "chapter">
                <div className = "chapter-content"  id = {'chapter' + order} onClick = {onHandleShowOperator.bind(this)}>
                    <p className = "chapter-content-title">{title}</p>
                    {content.map((item, index) =>
                        <p key = { index } className = "chapter-content-para">{item}</p>
                    )}
                </div>
            </div>
        )
    }
}

export default Read