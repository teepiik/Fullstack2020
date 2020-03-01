const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return  action.notification
        default:
            return state
    }
}

export const notificationChange = (notification, timeOut) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })
        setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                notification: null
            })
        }, timeOut*1000)
    }
}

export default notificationReducer