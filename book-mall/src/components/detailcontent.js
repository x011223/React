import React, { Component } from 'react';

class DetailContent extends Component {
    render () {
        const { book, updated } = this.props
        return (
            <div className ="detail-middle-content">
                <div className = "detail-img-wrapper">
                    <img src = { `http://statics.zhuishushenqi.com${book.cover}` } alt = "" className = "detail-middle-img" />                            
                </div>
                <div className = "detail-content-info">
                    <span className = "content-info-title">{ book.title }</span>
                    <span className = "content-info-rate">{ book.author }&nbsp;|&nbsp;{book.cat}&nbsp;|&nbsp;{(book.wordCount / 10000).toFixed(2)}万字</span>
                    <span className = "content-info-updated">{ updated }更新</span>
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