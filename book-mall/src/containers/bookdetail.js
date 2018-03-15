import React, { Component } from 'react';
import axios from 'axios'
// import PropTypes from 'prop-types';
import '../style/book.css'
import Rate from '../components/rate'

class BookDetail extends Component {
    constructor () {
        super()
        this.state = {
            book: []
        }
    }
    
    format = date => {
        return this.getDateDiff(new Date(date));
    };
      
    getDateDiff (dateTimeStamp) {
        let minute = 1000 * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let now = new Date().getTime();
        let diffValue = now - dateTimeStamp;
        if (diffValue < 0) {
          return;
        }
       
        let dayC = diffValue / day;
        let hourC = diffValue / hour;
        let minC = diffValue / minute;
        let result = "";
        if (dayC >= 7) {
          result = dateTimeStamp.toLocaleDateString().replace(/\//g, "-");
        } else if (dayC >= 1) {
          result = "" + Number.parseInt(dayC, 10) + "天前";
        } else if (hourC >= 1) {
          result = "" + Number.parseInt(hourC, 10) + "小时前";
        } else if (minC >= 1) {
          result = "" + Number.parseInt(minC, 10) + "分钟前";
        } else {
          result = "刚刚";
        }
        return result;
    }

    _getBookDetail () {
        let url = `/api/getBookDetail`
        const data = {
            id: this.props.match.params.id
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    getBookDetail () {
        this._getBookDetail().then((res) => {
            this.setState(
                { book: res }
            )
            console.log(this.state.book)
        })
    }

    componentDidMount () {
        this.getBookDetail()
    }

    render () {
        return (
            <div className = "book-detail">
                <div className = "detail-top">
                    <span className = "detail-top-back top-three">返回</span>
                    <span className = "detail-top-title top-three">书籍详情</span>
                    <span className = "detail-top-home top-three">回到首页</span>
                </div>
                <div className ="detail-middle">
                    <div className ="detail-middle-content">
                        <div className = "detail-img-wrapper">
                            <img src = { `http://statics.zhuishushenqi.com${this.state.book.cover}` } alt = "" className = "detail-middle-img" />                            
                        </div>
                        <div className = "detail-content-info">
                            <span className = "content-info-title">{ this.state.book.title }</span>
                            <span className = "content-info-rate">{ this.state.book.author }&nbsp;|&nbsp;{this.state.book.cat}&nbsp;|&nbsp;{(this.state.book.wordCount / 10000).toFixed(2)}万字</span>
                            <span className = "content-info-updated">{ this.format(this.state.book.updated) }更新</span>
                        </div>
                        <div className = "detail-operator-wrapper">
                            <div className = "operator-add operator-item">
                                
                            </div>
                            <div className = "operator-read operator-item">
                                开始阅读
                            </div>
                        </div>
                    </div>
                    <div className = "detail-rate-wrapper">
                        <Rate title = {'追人气'} number = {(this.state.book.latelyFollower / 10000).toFixed(1) + '万'} />
                        <Rate title = {'读者留存率'} number = {this.state.book.retentionRatio + '%'} />
                        <Rate title = {'日更字数/天'} number = {this.state.book.serializeWordCount} />                      
                    </div>
                </div>
                <div>
                    <div>
                        <p>{this.state.book.longIntro}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookDetail