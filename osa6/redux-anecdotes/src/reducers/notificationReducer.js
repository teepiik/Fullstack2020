const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return  action.notification
        default:
            return state
    }
}

export const notificationChange = (notification, timeOut, clearID) => {
    clearTimeout(clearID)
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })
        const timeOutID = setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                notification: null
            })
        }, timeOut*1000)
        return timeOutID
    }
}

export default notificationReducer