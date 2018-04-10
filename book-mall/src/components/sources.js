import React, { Component } from 'react'

class Sources extends Component {
    render () {
        const { sources, handleSourcesList } = this.props
        return (
            <div>
                { sources ?
                    sources.map((source, index) => <li key = { index } 
                                                        className = "sources-list-item" 
                                                        onClick = { handleSourcesList.bind(this, index) } >
                        <span>{ source.name }</span>
                    </li>)
                    : ''
                }
            </div>
        )
    }
}

export default Sources