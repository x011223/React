import React, { Component } from 'react';
import '../style/readpage.css'

class Read extends Component {

    render () {
        const { content } = this.props;
        return (
            <div className = "chapter">
                <div className = "chapter-operator">
                    <span className = "chapter-operator-back">返回</span>
                    <span className = "chapter-operator-change">换源</span>
                </div>
                <div className = "chapter-content">
                    <p className = "chapter-content-title">{this.props.title}</p>
                    {content.map((item, index) =>
                        <p key = { index } className = "chapter-content-para">{item}</p>
                    )}
                </div>
            </div>
        )
    }
}

export default Read