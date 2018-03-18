import React, { Component } from 'react';
import Read from '../components/read'
import '../style/readpage.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { initChaptersLinks } from '../reducers/book'

class ReadPage extends Component {
    constructor () {
        super()
        this.state = {
            title: '',
            content: [],
            isOperatorShow: false,
            backgroundColor: '',
            color: '',
            fontSize: 16,
        }
    }

    componentDidMount () {
        this.getChapterContent()
        console.log(this.props)
    }

    _getChapterContent () {
        let url = '/api/getChapterContent'
        const data = {
            link: this.props.location.state.query.linkUrl
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    getChapterContent () {
        this._getChapterContent().then((res) => {
            // let reg = /^\s{2,}/gm
            let reg = /\n/gm
            let c = res.chapter.cpContent.split(reg)
            this.setState(
                {
                    title: res.chapter.title,
                    content: c
                }
            )
        })
    }

    handleClickBack () {
        this.props.history.goBack()
    }

    handleShowOperator () {
        this.setState(
            { isOperatorShow: !this.state.isOperatorShow }
        )
    }

    changeColor (model) {
        switch(model) {
            case 'default':           
                this.readPageDiv.style.setProperty('--backgroundColor', '#eee6dd')
                this.readPageDiv.style.setProperty('--fontColor', '#888277')
                break;
            case 'night':
                this.readPageDiv.style.setProperty('--backgroundColor', 'rgb(45, 48, 53)')
                this.readPageDiv.style.setProperty('--fontColor', 'rgb(88, 89, 93)')
                break;
            case 'eyepro':
                this.readPageDiv.style.setProperty('--backgroundColor', '#cce8cf')
                this.readPageDiv.style.setProperty('--fontColor', '#666')
                break;
            default:
                return
        }
    }

    handleSize (size, symbol) {
        if (this.state.fontSize === size) {
            return
        }
        this.setState(
            { 
                fontSize: this.state.fontSize + symbol
            }
        )
    }

    render () {
        const { title, content, isOperatorShow, fontSize } = this.state
        return (
            <div className = "read-page-wrapper" ref = {(div) => {this.readPageDiv = div}} style = {{fontSize: fontSize + 'px'}}>
                <Read title = {title} 
                      content = {content} 
                      onHandleShowOperator = {this.handleShowOperator.bind(this)}
                />
                <div className = { isOperatorShow ? 'chapter-operator-top show-pannel' : 'chapter-operator-top' }>
                    <span className = "chapter-operator-back" onClick = {this.handleClickBack.bind(this)}>返回</span>
                    <span className = "chapter-operator-change">换源</span>
                </div>
                <div className = { isOperatorShow ? 'chapter-operator-bottom show-pannel' : 'chapter-operator-bottom'}>
                    <div className = "operator-line1">
                        <span className = "operator-line1-sub" onClick = {this.handleSize.bind(this, 10, -2)}>A-</span>
                        <span className = "operator-line1-line">
                            <span style = {{ width: 30 + 5 * (fontSize - 16) + '%' }}></span>
                        </span>
                        <span className = "operator-line1-add" onClick = {this.handleSize.bind(this, 30, 2)}>A+</span>
                    </div>
                    <div className = "operator-line2">
                        <span className = "operator-line2-default" 
                              onClick = {this.changeColor.bind(this, 'default')}
                              >默认</span>
                        <span className = "operator-line2-night"
                              onClick = {this.changeColor.bind(this, 'night')}
                              >夜间</span>
                        <span className = "operator-line2-eyepro" 
                              onClick = {this.changeColor.bind(this, 'eyepro')}
                              >护眼</span>
                    </div>
                    <div className = "operator-line3">
                        <span className = "operator-line3-prev">上一章</span>
                        <span className = "operator-line3-menu">目录</span>
                        <span className = "operator-line3-next">下一章</span>
                    </div>
                </div>
            </div>   
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         links: state.links
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
        
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ReadPage)
export default ReadPage