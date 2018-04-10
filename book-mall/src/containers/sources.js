import React, { Component } from 'react'
import Sources from '../components/sources'
import { withRouter } from 'react-router-dom'

class SourcesWrapper extends Component {
    render () {
        const _sources = JSON.parse(localStorage.getItem('book_sources'))
        const { changeSources } = this.props
        return (
            <Sources sources = { _sources } handleSourcesList = { changeSources.bind(this) }/>
        )
    }
}

export default withRouter(SourcesWrapper)