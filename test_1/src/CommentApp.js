import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import PropTypes from 'prop-types'
import wrapWithLoadData from './wrapWithLoadData'

class CommentApp extends Component {
    static propTypes = {
        data: PropTypes.any,
        saveData: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props)
        this.state = {
            comments: props.data || []
        }
    }

    // _loadComments () {
    //     let comments = localStorage.getItem('comments')
    //     if (comments) {
    //         comments = JSON.parse(comments)
    //         this.setState({ comments })
    //     }
    // }

    // _saveComments (comments) {
    //     localStorage.setItem('comments', JSON.stringify(comments))
    // }

    handleSubmitComment (comment) {
        if (!comment) return
        if (!comment.userName) return alert('请输入用户名')
        if (!comment.content) return alert('请输入评论内容')
        const comments = this.state.comments
        comments.push(comment)
        this.setState({
            comments
        })
        this.props.saveData(comments)
    }

    // componentWillMount () {
    //     this._loadComments()
    // }

    handleDeleteComment (index) {
        const comments = this.state.comments
        comments.splice(index, 1)
        this.setState({ comments })
        this.props.saveData(comments)
    }

    // componentWillUnmount () {
    //     clearInterval(this._timer)
    // }

    render() {
        return (
            <div className='wrapper'>
                <CommentInput onSubmit={ this.handleSubmitComment.bind(this) } />
                <CommentList comments= { this.state.comments } onDeleteComment={ this.handleDeleteComment.bind(this) }  />
            </div>
        )
    }
}

CommentApp = wrapWithLoadData(CommentApp, 'comments')

export default CommentApp