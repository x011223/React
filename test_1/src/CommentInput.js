import React, { Component } from 'react'
import PropTypes from 'prop-types'
import wrapWithLoadData from './wrapWithLoadData'

class CommentInput extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
        data: PropTypes.any,
        saveData: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props)
        this.state = {
            userName: props.data,
            content: '',
        }
    }

    handleUserNameChange (event) {
        this.setState(
            // 通过 event.target.value 获取 <input /> 中用户输入的内容        
            { userName: event.target.value }
        )
    }

    handleContentChange (event) {
        this.setState(
            { content: event.target.value }
        )
    }

    handleSubmit () {
        // handleSubmit 方法会判断 props 中是否传入了 onSubmit 属性。有的话就调用该函数，并且把用户输入的用户名和评论数据传入该函数。
        // 然后再通过 setState 清空用户输入的评论内容（为了用户体验，保留输入的用户名）。
        if (this.props.onSubmit) {
            const { userName, content } = this.state
            this.props.onSubmit(
                { 
                    userName: this.state.userName,
                    content: this.state.content,
                    createdTime: +new Date()
                }
            )
        }
        this.setState(
            {  content: '' }
        )
    }

    handleUserNameBlur (event) {
        this.props.saveData(event.target.value)
    }


    componentDidMount () {
        this.textarea.focus()
    }
    
    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input 
                            value = { this.state.userName } 
                            onChange = { this.handleUserNameChange.bind(this) }
                            onBlur = { this.handleUserNameBlur.bind(this) }
                        />
                    </div>
                </div>
                <div className = 'comment-field'>
                    <span className = 'comment-field-name'>评论内容：</span>
                    <div className = 'comment-field-input'>
                        <textarea 
                            ref = { (textarea) => this.textarea = textarea}
                            value = { this.state.content } 
                            onChange = { this.handleContentChange.bind(this) }
                        />
                    </div>
                </div>
                <div className = 'comment-field-button'>
                    <button onClick = { this.handleSubmit.bind(this) }>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}

CommentInput = wrapWithLoadData(CommentInput, 'userName')
export default CommentInput