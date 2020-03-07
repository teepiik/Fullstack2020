import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = '', action) => {
    switch(action.type) {
    case 'SET_USER':
        return  { ...state, user:action.data }
    case 'LOGOUT':
        return { ...state, user:null }
    default:
        return state
    }
}

export const login = (credentials) => {
    return async dispatch => {
        try {
            const loggedUser = await loginService.login(credentials)
            if(loggedUser) {
                window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
                blogService.setToken(loggedUser.token)
            }
            await dispatch({
                type: 'SET_USER',
                data: loggedUser
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const setUser = (loggedUser) => {
    return async dispatch => {
        console.log('SET USER')
        window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
        await dispatch({
            type: 'SET_USER',
            data: loggedUser
        })
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.clear()
        await dispatch({
            type: 'LOGOUT'
        })
    }
}

export default userReducer