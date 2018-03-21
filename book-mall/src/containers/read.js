import React, { Component } from 'react';
import Read from '../components/read'
import '../style/readpage.css'
import axios from 'axios'
import { connect } from 'react-redux'

class ReadPage extends Component {
    constructor () {
        super()
        this.state = {
            isOperatorShow: false,
            backgroundColor: '',
            color: '',
            fontSize: 16,
            chapters: [{
                order: '',
                title: '',
                content: [],
            }],
            order: '',
        }
    }

    componentDidMount () {
        this.setState(
            {order: +this.props.match.params.index + 1}
        )
        this.getChapterContent(this.props.location.state.query.linkUrl)
        this.handleScroll()
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.getPosTop)
    }

    handleScroll () {
        let browerHeight = document.documentElement.clientHeight  
        let timer = null
        let prevTop = 0
        window.addEventListener('scroll', function getPosTop ()  {
            let hiddenDivPos = this.hiddenDiv && this.hiddenDiv.getBoundingClientRect().top
            let scrollY = window.scrollY
            let direction = scrollY - prevTop
            clearTimeout(timer)
            timer = setTimeout(() => {
                if ((hiddenDivPos <= browerHeight + 400) && (direction > 0)) {
                    this.handleNewChapter('nextChapter')
                } else {
                    return
                }
            }, 200)   
        }.bind(this))  
    }
    
    _getChapterContent (linkUrl) {
        let url = '/api/getChapterContent'
        const data = {
            // link: this.props.location.state.query.linkUrl
            link: linkUrl
        }
        return axios.get(url, { params: data }).then((res) => {
            return Promise.resolve(res.data)
        })
    }

    getChapterContent (linkUrl, operator) {
        this._getChapterContent(linkUrl).then((res) => {
            // let reg = /^\s{2,}/gm
            let regFormatLine = /\n/gm
            let regExtraTitle = /(\u7b2c.*\u7ae0.*\n)/gm
            let removeExtraTitle = res.chapter.cpContent.replace(regExtraTitle, '')
            let formatLine = removeExtraTitle.split(regFormatLine)
            let isInChapters = false
            if (res.chapter.isVip) {
                formatLine = ['这是付费章节']
            }
            let objChapter = {
                    order: this.state.order,
                    title: res.chapter.title,
                    content: formatLine
                }
            this.state.chapters.map((item) => {
                if (item.order === objChapter.order) {
                    isInChapters = true
                } 
            })              
            const { chapters } = this.state
            if (!chapters[0].title) {
                this.setState(
                    { chapters: [objChapter] }
                )
            } else {
                let chaptersCache = chapters
                if ((objChapter.order > chapters[chapters.length - 1].order) && !isInChapters) {        
                    this.setState(
                        {chapters: [...chaptersCache, objChapter]}
                    )
                } else if ((objChapter.order < chapters[0].order) && !isInChapters) {
                    chaptersCache.unshift(objChapter)
                    this.setState(
                        {chapters: chaptersCache}
                    )
                } else {
                    console.log('此文章已缓存')
                }
            }         
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

    handleNewChapter (operator) {
        switch (operator) {
            case 'nextChapter':
                this._getNextChapter()
            break
            case 'prevChapter':
                this._getPrevChapter()
            break
            default:
                return
        }
    }

    _getNextChapter () {
        const { linksReducer } = this.props
        this.setState(
            {order: this.state.order + 1}
        ) 
        const { order } = this.state
        this.getChapterContent(linksReducer.linksReducer[order].link, 'nextChapter')
    }

    _getPrevChapter () {
        const { linksReducer } = this.props
        this.setState(
            {order: this.state.order - 1}
        ) 
        const { order } = this.state
        // if (!isInChapters) 
        this.getChapterContent(linksReducer.linksReducer[order].link, 'prevChapter')
    }

    render () {
        const { isOperatorShow, fontSize, chapters, order } = this.state
        return (
            <div className = "read-page-wrapper" ref = {(div) => {this.readPageDiv = div}} style = {{fontSize: fontSize + 'px'}}>
                <div className = { isOperatorShow ? 'chapter-operator-top show-pannel' : 'chapter-operator-top' }>
                    <span className = "chapter-operator-back" onClick = {this.handleClickBack.bind(this)}>返回</span>
                    <span className = "chapter-operator-change">换源</span>
                </div>
                { this.state.chapters.map((chapter, index) => 
                    <Read title = {chapter.title} 
                        content = {chapter.content} 
                        onHandleShowOperator = {this.handleShowOperator.bind(this)}
                        key = { index }
                        order = {order}
                    />
                )}
                <div ref = {(div) => {this.hiddenDiv = div}} className = "hidden-div"></div>
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
                        <span className = "operator-line3-prev" href = { '#' + 'chapter' + order } onClick = {this.handleNewChapter.bind(this, 'prevChapter')}>上一章</span>
                        <span className = "operator-line3-menu">目录</span>
                        <span className = "operator-line3-next" href = { '#' + 'chapter' + order } onClick = {this.handleNewChapter.bind(this, 'nextChapter')}>下一章</span>
                    </div>
                </div>
            </div>   
        )
    }
}

const mapStateToProps = (state) => {
    return {
        linksReducer: state.linksReducer
    }
}

export default connect(mapStateToProps)(ReadPage)