import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
    const notification = props.notification

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    if(notification === null || notification === '') {
        return (
            <div></div>
        )
    }

    return (
        <div style={style}>{notification}</div>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification