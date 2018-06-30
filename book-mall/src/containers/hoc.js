import React, { Component } from 'react'

const Hoc = (component, data) => {
    return class extends Component {
        constructor (props) {
            super(props)
            this.state = {
                ranks: data
            }
        }
    }
}