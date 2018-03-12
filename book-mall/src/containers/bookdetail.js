import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'

class BookDetail extends Component {
    render () {
        return (
            <div className = "book-detail">
            
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        INIT_BOOK_ID: state.INIT_BOOK_ID
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onSubmit: (INIT_BOOK_ID) => {
//             dispatch(addComment(comment))
//         }
//     }
// }

export default connect(
    mapStateToProps
)(BookDetail)