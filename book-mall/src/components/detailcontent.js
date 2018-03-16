import React, { Component } from 'react';

class DetailContent extends Component {
    render () {
        return (
            <div className ="detail-middle-content">
                <div className = "detail-img-wrapper">
                    <img src = { `http://statics.zhuishushenqi.com${this.props.book.cover}` } alt = "" className = "detail-middle-img" />                            
                </div>
                <div className = "detail-content-info">
                    <span className = "content-info-title">{ this.props.book.title }</span>
                    <span className = "content-info-rate">{ this.props.book.author }&nbsp;|&nbsp;{this.props.book.cat}&nbsp;|&nbsp;{(this.props.book.wordCount / 10000).toFixed(2)}万字</span>
                    <span className = "content-info-updated">{ this.props.updated }更新</span>
                </div>
                <div className = "detail-operator-wrapper">
                    <div className = "operator-add operator-item">
                        
                    </div>
                    <div className = "operator-read operator-item">
                        开始阅读
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailContent